import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import business from '@/components/business'
import unreadArticle from '@/components/unreadArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/business',
      name: 'business',
      component: business
    },
    {
      path: '/unreadArticle',
      name: 'unreadArticle',
      component: unreadArticle
    },
  ]
})

