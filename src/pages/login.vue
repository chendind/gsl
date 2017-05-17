<!--
分为正常登录和游客登录
正常登录 #/login?type=user
游客登录 #/login?type=tourist
-->
<template>
  <div>
  </div>
</template>
<script>
import { getUserData, getPortalLists, getPublicPortal } from '@/assets/js/ajax.js'
import router from '@/router'
export default {
  name: 'login',
  components: {
  },
  methods: {
    touristLogin(){
      // 游客登录
      getUserData().then((data1) => {
        if (data1.state == 0) {
          localStorage.setItem('userId', data1.order);
          getPublicPortal().then((data2) => {
            localStorage.setItem('portalLists', JSON.stringify(data2.order))
            localStorage.setItem('portalId', data2.order[0].id);
            localStorage.setItem('userType', 'tourist');
            this.loginSuccess();
          })
        }
      })
    },
    login(){
      // 正常登录
      Bridge.setAppID("21216");
      Bridge.tryLogin((data) => {
        console.log(`Bridge登陆：${JSON.stringify(data)}`)
        if (!data) {
          if(this.$root.isApp){
            this.touristLogin();
            return;
          } else {
            data = {};
            data.openid = "c92d6478259631360f0578e0647aac92";
          }
        }
        getUserData(data.openid).then((data1) => {
          if (data1.state == 0) {
            localStorage.setItem('userId', data1.order);
            getPortalLists().then((data2) => {
              localStorage.setItem('portalLists', JSON.stringify(data2.order))
              localStorage.setItem('portalId', data2.order[0].id)
              localStorage.setItem('userType', 'user');
              this.loginSuccess();
            });
          }
        });
      });
    },
    loginSuccess(){
      const query = this.$root.getQueryData();
      if (query && query.url) {
        this.$root.replaceMobileWindow(query.url);
      } else {
        router.replace({path: 'index', query: {_: new Date() - 0}});
      }
    }
  },
  mounted(){
    if (location.hash.indexOf('tourist') >= 0) {
      this.touristLogin();
    } else {
      this.login();
    }

  }
}
</script>
