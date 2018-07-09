import Vue from 'vue'
import App from './App.vue'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import VueWebsocket from "vue-websocket";
Vue.use(VueWebsocket, "ws://localhost:8000");


new Vue({
  el: '#app',
  render: h => h(App)
})
