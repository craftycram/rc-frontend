<template>
  <div id="queue">
    <div class="container">
      <div v-for="(w, idx) in currentQueue[1]" :key="w.id.toString()"
        v-bind:class="{ isYou: (w.id == ownId), isActive: (idx == 0)}">
        <span class="ownname">{{w.name}}</span>
        <span v-if="w.id == ownId"> (You)</span>
        <span v-if="idx == 0"> (ACTIVE)</span>
        <br /><small style="color: lightgray;">{{w.id}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentQueue: [],
      ownId: 'undefined',
      clientName: 'undefined',
      currentTimer: 0,
    };
  },
  sockets: {
    update_queue: (data) => {
      this.currentQueue = data;
    },
    queue_ping: () => {
      this.$socket.emit('queue_pong');
    },
    update_timer: (data) => {
      this.currentTimer = data;
    },
    client_name: (data) => {
      this.clientName = data;
    },
  },
  computed: {
    amIActive: () => {
      if (this.currentQueue.length === 0) return false;
      return this.currentQueue[1][0].id === this.ownId;
    },
  },
};
</script>

<style>
  #queue .container div {
    display: block;
    width: 600px;
    border: 1px solid black;
    list-style-type: none;
    height: 50px;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
  }

  #queue .container div.isYou {
    border-left: 5px solid hotpink;
  }

  #queue .container div.isActive {
    background-color: lightgreen;
  }
</style>
