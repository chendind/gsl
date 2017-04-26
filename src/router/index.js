import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import summary from '@/components/summary'
import unreadArticle from '@/components/unreadArticle'
import announce from '@/components/announce'
import policy from '@/components/policy'
import education from '@/components/education'
import questionaire from '@/components/questionaire'

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
      path: '/summary',
      name: 'summary',
      component: summary
    },
    {
      path: '/unreadArticle',
      name: 'unreadArticle',
      component: unreadArticle
    },
    {
      path: '/announce',
      name: 'announce',
      component: announce
    },
    {
      path: '/policy',
      name: 'policy',
      component: policy
    },
    {
      path: '/education',
      name: 'education',
      component: education
    },
    {
      path: '/questionaire',
      name: 'questionaire',
      component: questionaire
    },
  ]
})

