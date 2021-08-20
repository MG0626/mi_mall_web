import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入axios
import http from './network/request'
// 导入elementUI
import './plugins/element.js'

// 导入normalize
import('./assets/css/normalize.css')
// 导入全局css样式
import('./assets/css/global.css')
// 导入iconfont图标
import('./assets/css/iconfont.css')

Vue.config.productionTip = false

// 添加到原型上
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
