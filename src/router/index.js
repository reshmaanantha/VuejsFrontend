import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users/add',
    name: 'AddUser',
    component: () => import('../views/AddUser'),
    props:true
  },
  {
    path: '/users/edit',
    name: 'EditUser',
    component: () => import('../views/EditUser'),
    props:true
     },
  {
    path:'/:catchAll(.*)',
    name:'NotFound',
    component:() => import('../views/NotFound')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
