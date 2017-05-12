import Vue from 'vue'
import Router from 'vue-router'

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
      component(r) {
        r(require('@/pages/index'));
      }
    },
    {
      path: '/login',
      name: 'login',
      component(r){
        r(require('@/pages/login'));
      }
    },
    {
      path: '/summary',
      name: 'summary',
      component(r){
        r(require('@/pages/summary'));
      }
    },
    {
      path: '/unreadArticle',
      name: 'unreadArticle',
      component(r){
        r(require('@/pages/unreadArticle'));
      }
    },
    {
      path: '/announce',
      name: 'announce',
      component(r){
        r(require('@/pages/announce'));
      }
    },
    {
      path: '/policy',
      name: 'policy',
      component(r){
        r(require('@/pages/policy'));
      }
    },
    {
      path: '/education',
      name: 'education',
      component(r){
        r(require('@/pages/education'));
      }
    },
    {
      path: '/questionaire',
      name: 'questionaire',
      component(r){
        r(require('@/pages/questionaire'));
      }
    },
    {
      path: '/trade',
      name: 'trade',
      component(r){
        r(require('@/pages/trade'));
      }
    },
    {
      path: '/mailbox',
      name: 'mailbox',
      component(r){
        r(require('@/pages/mailbox'));
      }
    },
    {
      path: '/merchantStyle',
      name: 'merchantStyle',
      component(r){
        r(require('@/pages/merchantStyle'));
      }
    },
    {
      path: '/article',
      name: 'article',
      component(r){
        r(require('@/pages/article'));
      }
    },
    {
      path: '/tagArticle',
      name: 'tagArticle',
      component(r){
        r(require('@/pages/tagArticle'));
      }
    },
    {
      path: '/questionaireDetail',
      name: 'questionaireDetail',
      component(r){
        r(require('@/pages/questionaireDetail'));
      }
    },
    {
      path: '/joinerList',
      name: 'joinerList',
      component(r){
        r(require('@/pages/joinerList'));
      }
    },
    {
      path: '/mutualAid',
      name: 'mutualAid',
      component(r){
        r(require('@/pages/mutualAid'));
      }
    },
    {
      path: '/mutualAidInfo',
      name: 'mutualAidInfo',
      component(r){
        r(require('@/pages/mutualAidInfo'));
      }
    },
    {
      path: '/addingAidInfo',
      name: 'addingAidInfo',
      component(r){
        r(require('@/pages/addingAidInfo'));
      }
    },
    {
      path: '/advice',
      name: 'advice',
      component(r){
        r(require('@/pages/advice'));
      }
    },
    {
      path: '/prosume',
      name: 'prosume',
      component(r){
        r(require('@/pages/prosume'));
      }
    },
    {
      path: '/mail', // 主席信箱中的二级页面
      name: 'mail',
      component(r){
        r(require('@/pages/mail'));
      }
    },
    {
      path: '/receipt', // 主席信箱中的二级页面
      name: 'receipt',
      component(r){
        r(require('@/pages/receipt'));
      }
    },
  ]
})

