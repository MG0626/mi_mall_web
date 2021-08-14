import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入vuex
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/home/Home'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/homeMain/homeMain')
      },
      {
        path: '/goods/:id',
        component: () => import('../views/goods/Goods')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../views/user/User'),
    redirect: '/user/login',
    children: [
      {
        path: '/user/login',
        component: () => import('../views/user/children/Login')
      },
      {
        path: '/user/register',
        component: () => import('../views/user/children/Register')
      }
    ]
  },
  {
    path: '/cart',
    component: () => import('../views/cart/Cart')
  },
  {
    path: '/pay',
    component: () => import('../views/pay/Pay')
  }
]

const router = new VueRouter({
  routes
})

// 路由前置守卫
router.beforeEach((to, form, next) => {
  // 获取token和时间戳
  let { token, time } = store.state.info

  // 判断token是否过期
  if(token){
    // 获取当前时间戳
    const currentTime = Date.now();
    // 判断是否过期
    if (currentTime >= time) {
      // 过期
      // 清除缓存
      window.localStorage.removeItem('info');
      window.localStorage.removeItem('token');
      // 清空
      store.dispatch('updateUserInfo', {});
      store.dispatch('updateToken', '')
    }
  }

  // 判断当前是否访问login
  if(to.path === '/user/login'){
    // 判断是否有token，有token就不给访问
    if(token) return next(form.path)
  }

  // 判断当前是否访问购物车和结算页面
  if(to.path === '/cart' || to.path === '/pay'){
    // 判断是否存在token
    if (!token) {
      // 不存在, 跳转到登录
      return next('/user/login')
    }
  }

  
  
  // 放行
  next()
})

export default router
