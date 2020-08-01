<template>
  <div id="app">
    <Layout streamUrl="http://hal.hfg.design:50005/live-20280.mjpg">
      <template v-slot:videocomponent></template>
      <template v-slot:controlcomponent>
        <Controls></Controls>
      </template>
      <template v-slot:queuecomponent>
        <Queue></Queue>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from './submodules/base_layout/src/components/interface.vue';
import Controls from './components/controls.vue';
import Queue from './components/queue.vue';

export default {
  name: 'App',
  components: {
    Layout,
    Controls,
    Queue,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
