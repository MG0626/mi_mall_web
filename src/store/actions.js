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
    const { data, status } = await http.get(`/cart/list/${state.info.id}`);
    status === 200 && commit('addCarts', data);
  },
  // 当前结算的商品
  saveCurrentPayInfo({ commit }, products){
    commit('saveCurrentPayInfo', products);
  }
}

export default actions;