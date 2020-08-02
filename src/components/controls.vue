<template>
  <div>
    <div v-show="!thunderState">
      <div>Status: {{connectedMsg}}</div>
      <b-button class="buttons"
        :disabled="!connected || !$store.getters.amIActive" v-on:click="go()">
        Forward
        <br>
        W / <b-icon icon="arrow-up-square"></b-icon>
      </b-button>
      <b-button class="buttons"
        v-show="$store.getters.authorized"
        :disabled="!connected || !$store.getters.amIActive" v-on:click="back()">
        Back
        <br>
        S / <b-icon icon="arrow-down-square"></b-icon>
      </b-button>
      <b-button class="buttons"
        :disabled="!connected || !$store.getters.amIActive" v-on:click="turnLeft()">
        Left
        <br>
        A / <b-icon icon="arrow-left-square"></b-icon>
      </b-button>
      <b-button class="buttons"
        :disabled="!connected || !$store.getters.amIActive" v-on:click="turnRight()">
        Right
        <br>
        D / <b-icon icon="arrow-right-square"></b-icon>
      </b-button>
      <b-button class="buttons"
        :disabled="!connected || !$store.getters.amIActive" v-on:click="stop()">
        Stop
        <br>
        Space
      </b-button>
      <br>
      <b-button class="buttons"
        v-show="$store.getters.authorized"
        :disabled="!connected || !$store.getters.amIActive" v-on:click="shutdown()">
        shutdown
      </b-button>

      <input type="text" v-model="overridePW" v-on:change="authorize" placeholder="Autorisierung">
    </div>
    <div v-show="thunderState">
      Auf Grund eines Gewitters ist die Steuerung momentan deaktiviert.
    </div>
  </div>
</template>

<script>
export default {
  name: 'controls',
  data() {
    return {
      connectedMsg: 'Disconnected',
      connected: false,
      overridePW: '',
      thunderState: true,
    };
  },
  methods: {
    go() {
      this.$socket.emit('control', 'w');
    },
    back() {
      /*
      this.$socket.emit('control-left', -100);
      this.$socket.emit('control-right', -100);
      */
    },
    stop() {
      this.$socket.emit('control', 'x');
    },
    turnLeft() {
      this.$socket.emit('control', 'a');
    },
    turnRight() {
      this.$socket.emit('control', 'd');
    },
    shutdown() {
      // this.$socket.emit('system', 'shutdown');
    },
    authorize: () => {
      this.$socket.emit('authorize', this.overridePW);
    },
    keyDown(e) {
      if (e.code === 'ArrowUp') {
        this.go();
      } else if (e.code === 'KeyW') {
        this.go();
      } else if (e.code === 'ArrowLeft') {
        this.turnLeft();
      } else if (e.code === 'KeyA') {
        this.turnLeft();
      } else if (e.code === 'ArrowRight') {
        this.turnRight();
      } else if (e.code === 'KeyD') {
        this.turnRight();
      } else if (e.code === 'ArrowDown') {
        this.back();
      } else if (e.code === 'KeyS') {
        this.back();
      } else if (e.code === 'Space') {
        this.stop();
      }
      // do stuff
    },
  },
  sockets: {
    connect() {
      // eslint-disable-next-line no-console
      console.log('socket connected');
      this.connectedMsg = 'Connected';
      this.connected = true;
      this.$store.state.ownId = this.$socket.id;
      this.$socket.emit('register_front');
    },

    disconnect() {
      // eslint-disable-next-line no-console
      console.log('socket disconnected');
      this.connected = false;
      this.connectedMsg = 'Disonnected';
    },
    nsp_list: (data) => {
      // eslint-disable-next-line no-console
      console.log(`NSPs:${data}`);
    },
    authorized: (data) => {
      this.$store.getters.authorized = data;
    },
    thunder: (data) => {
      this.thunderState = data;
    },
    serialresponse: (data) => {
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
  .buttons {
    margin: 10px;
  }
</style>
