// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import '@/assets/js/public.js'
import '@/assets/less/public.less'

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  methods: {
    openMobileWindow(url, name, callback){
      const url2name = {
        unreadArticle: '最新消息',
        article: '新闻详情',
        education: '教育培训',
        policy: '政策解读',
        questionaire: '问卷调查',
        summary: '市联概况',
        trade: '招商经贸',

      }
      if (location.host === 'portal.xiyoukeji.com') {
        router.push({path: url})
      } else {
        Bridge.openMobileWindow(`index.html#/${url}`, name || url2name[url] || "", (result) => {
          callback&&callback(result);
        });
      }
    }
  },
  render: h => h(App),
}).$mount('#app-box')

Vue.filter('time', (value) => {
  const date = new Date(value);
  let Y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let H = date.getHours();
  let i = date.getMinutes();
  let s = date.getSeconds();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  return `${m}-${d}`;
});
