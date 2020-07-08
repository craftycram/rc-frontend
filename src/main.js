import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://192.168.1.25:3001',
  options: {},
}));

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
