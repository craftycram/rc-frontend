<template>
  <div id="app">
    <Layout></Layout>
    <Controls></Controls>
  </div>
</template>

<script>
import Layout from './submodules/base_layout/src/components/interface.vue';
import Controls from './components/controls.vue';

export default {
  name: 'App',
  components: {
    Layout,
    Controls,
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
