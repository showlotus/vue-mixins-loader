import Vue from 'vue';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';

console.log(App);

new Vue({
  el: '#app',
  render: (h) => h(App)
});
