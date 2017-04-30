// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import  { AlertPlugin } from 'vux'
import '@/assets/js/public.js'
import '@/assets/js/vconsole.min.js'
import '@/assets/less/public.less'

FastClick.attach(document.body)

Vue.use(AlertPlugin)
Vue.use(MintUI)

Vue.config.productionTip = false

Vue.filter('time', (value) => {
  const date = getFormatTime(value);
  return `${date.m}-${date.d}`;
});
Vue.filter('time1', (value) => {
  const date = getFormatTime(value);
  return `${date.y}年${date.m}月${date.d}日`;
});
Vue.filter('time2', (value) => {
  const date = getFormatTime(value);
  return `${date.y}-${date.m}-${date.d}`;
});
//问卷调查中使用
Vue.filter('outdated', (items) => {
  return items.filter(item => item.end_time*1000 < new Date().getTime());
});

/* eslint-disable no-new */
new Vue({
  router,
  data(){
    return {
      disabledLink: false,
    }
  },
  methods: {
    openMobileWindow(url, name, callback){
      let fullpath;
      if (!this.$data.disabledLink) {
        const url2name = {
          unreadArticle: '最新消息',
          article: '新闻详情',
          education: '教育培训',
          policy: '政策解读',
          questionaire: '问卷调查',
          summary: '市联概况',
          trade: '招商经贸',
          public: '游客页面',
          mutualAid: '生活互助',
          advice: '建议反馈',
          prosume: '推荐内容',
        }
        if (url.match(/http[s]?:\/\//)) {
          fullpath = url;
        } else {
          fullpath = `${location.origin+location.pathname}#/${url}`;
        }
        if (location.pathname.indexOf('Index')>=0) {
          // console.log(`index.html#/${url}`, name || url2name[url] || "")

          Bridge.openMobileWindow(fullpath, name || url2name[url] || "", (result) => {
            callback&&callback(result);
          });
        } else {
          location.href = fullpath;
          // router.push({path: url})
        }
      }
    },
    // 把对象转换成字符串，并进行URI编码，用于url中的查询参数拼接
    encodeObj(obj){
      return encodeURIComponent(JSON.stringify(obj));
    },
    // 获取url中的search，提取数据
    getQueryData(){
      var searchUrl = window.location.hash.split("?")[1];
      if (searchUrl.indexOf('&random=')) {
        searchUrl = searchUrl.split('&random=')[0];
      }
      var URI = decodeURIComponent(searchUrl);
      var parseURI = URI;
      if(URI){
          try{
              parseURI = JSON.parse(URI);
          }
          catch(e){
              parseURI = "";
          }
      }
      return parseURI;
    },
  },
  render: h => h(App),
}).$mount('#app-box')


function getFormatTime(value) {
  const date = new Date(value*1000);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let i = date.getMinutes();
  let s = date.getSeconds();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (h < 10) {
    h = '0' + h;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  return {
    y, m, d, h, i, s
  };
}
