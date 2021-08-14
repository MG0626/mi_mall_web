// 网络请求
import http from '../network/request';

const actions = {
   // 保存token
  updateToken({ commit }, products){
    commit('saveToken', products);
  },
  // 保存用户信息
  updateUserInfo({ commit }, products){
    commit('saveUserInfo', products);
  },
  // 获取购物车
  getCarts: async function({ commit, state }){
    // 获取购物车列表
    const { data } = await http.get(`/cart/list/${state.info.id}`);
    commit('addCarts', data);
  },
  // 添加购物车
  updateCart({ commit }, products){
    commit('addCart', products);
  }
}

export default actions;