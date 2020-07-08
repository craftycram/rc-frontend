<template>
  <div>
    <b-button v-on:click="go()">Forward</b-button>
    <b-button v-on:click="back()">Back</b-button>
    <b-button v-on:click="turnLeft()">Left</b-button>
    <b-button v-on:click="turnRight()">Right</b-button>
    <b-button v-on:click="stop()">Stop</b-button>
  </div>
</template>

<script>
export default {
  name: 'controls',
  methods: {
    go() {
      this.$socket.emit('control-left', 100);
      this.$socket.emit('control-right', 100);
    },
    back() {
      this.$socket.emit('control-left', -100);
      this.$socket.emit('control-right', -100);
    },
    stop() {
      this.$socket.emit('control-left', 0);
      this.$socket.emit('control-right', 0);
    },
    turnLeft() {
      this.$socket.emit('control-left', 100);
      this.$socket.emit('control-right', -100);
    },
    turnRight() {
      this.$socket.emit('control-left', -100);
      this.$socket.emit('control-right', 100);
    },
    keyDown(e) {
      if (e.code === 'ArrowUp') {
        this.go();
      } else if (e.code === 'w') {
        this.go();
      } else if (e.code === 'ArrowLeft') {
        this.turnLeft();
      } else if (e.code === 'a') {
        this.turnLeft();
      } else if (e.code === 'ArrowRight') {
        this.turnRight();
      } else if (e.code === 'd') {
        this.turnRight();
      } else if (e.code === 'ArrowDown') {
        this.back();
      } else if (e.code === 's') {
        this.back();
      } else if (e.code === 'Space') {
        this.stop();
      }
      // do stuff
    },
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      // eslint-disable-next-line no-console
      console.log('connected');
    },

    disconnect() {
      // eslint-disable-next-line no-console
      console.log('disconnected');
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      // eslint-disable-next-line no-console
      console.log('message-channel');
      // eslint-disable-next-line no-console
      console.log(data);
    },
  },
  mounted() {
    this.sockets.subscribe('broadcastLike', (data) => {
      // eslint-disable-next-line no-console
      console.log(data);
    });
  },
  created() {
    window.addEventListener('keydown', this.keyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown);
  },
};
</script>

<style>

</style>
