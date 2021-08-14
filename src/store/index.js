import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  // 用户信息
  info: JSON.parse(window.localStorage.getItem('info')) || {},
  token: JSON.parse(window.localStorage.getItem('token')) || '',
  // 购物车列表
  carts: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
