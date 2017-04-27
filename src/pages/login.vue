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
      getUserData().done((data1) => {
        if (data1.state == 0) {
          localStorage.setItem('userId', data1.order);
          getPublicPortal().done((data2) => {
            localStorage.setItem('portalLists', JSON.stringify(data2.order))
            localStorage.setItem('portalId', data2.order[0].id);
            localStorage.setItem('userType', 'tourist');
            router.replace({path: 'index', query: {_: new Date() - 0}});
          })
        }
      })
    },
    login(){
      // 正常登录
      Bridge.setAppID("21216");
      Bridge.tryLogin((data) => {
        if (!data) {
          // this.touristLogin();
          // return;
          data = {};
          data.openid = "c92d6478259631360f0578e0647aac92";
        }
        getUserData(data.openId).done((data1) => {
          if (data1.state == 0) {
            localStorage.setItem('userId', data1.order);
            getPortalLists().done((data2) => {
              localStorage.setItem('portalLists', JSON.stringify(data2.order))
              localStorage.setItem('portalId', data2.order[0].id)
              localStorage.setItem('userType', 'user');
              router.replace({path: 'index', query: {_: new Date() - 0}});
            });
          }
        });
      });
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
