import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入axios
import http from './network/request'

Vue.config.productionTip = false

// 添加到原型上
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
