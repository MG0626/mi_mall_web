const mutations = {
  // 保存token
  saveToken(state, payload){
    window.localStorage.setItem('token', JSON.stringify(payload));
    state.token = payload;
  },
  // 保存用户信息
  saveUserInfo(state, payload){
    window.localStorage.setItem('info', JSON.stringify(payload));
    state.info = payload;
  },
  // 添加购物车列表
  addCarts(state, payload){
    state.carts = payload;
  },
  // 添加购物车
  addCart(state, payload){
    state.carts.push(payload);
  }
}


export default mutations