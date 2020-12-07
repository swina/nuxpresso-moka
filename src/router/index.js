import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Dashboard from '@/views/Dashboard.vue'
import Components from '@/views/Components.vue'
import Moka from '@/views/Moka.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/components',
    name: 'Components',
    component: Components
  },
  {
    path: '/moka',
    name: 'Moka',
    component: Moka
  },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
