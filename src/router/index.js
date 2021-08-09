import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home'),
    children: [
      {
        path: '/',
        component: () => import('../views/homeMain/homeMain')
      },
      {
        path: '/goods',
        component: () => import('../views/goods/Goods')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
