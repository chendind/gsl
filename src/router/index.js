import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import login from '@/pages/login'
import summary from '@/pages/summary'
import unreadArticle from '@/pages/unreadArticle'
import announce from '@/pages/announce'
import policy from '@/pages/policy'
import education from '@/pages/education'
import questionaire from '@/pages/questionaire'
import trade from '@/pages/trade'
import article from '@/pages/article'
import tagArticle from '@/pages/tagArticle'
import questionaireDetail from '@/pages/questionaireDetail'
import mutualAid from '@/pages/mutualAid'

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
    {
      path: '/trade',
      name: 'trade',
      component: trade
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/tagArticle',
      name: 'tagArticle',
      component: tagArticle
    },
    {
      path: '/questionaireDetail',
      name: 'questionaireDetail',
      component: questionaireDetail
    },
    {
      path: '/mutualAid',
      name: 'mutualAid',
      component: mutualAid
    },
  ]
})

