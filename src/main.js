import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import VueSocketIO from 'vue-socket.io';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

/*
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://192.168.1.25:3001',
  options: {},
}));
*/

Vue.use(new VueSocketIO({
  debug: true,
  // eslint-disable-next-line no-template-curly-in-string
  connection: 'https://hal.hfg.design:10000/marcbot_control',
  options: {
    useConnectionNamespace: true,
  },
}));

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
