<template>
  <div>
  </div>
</template>
<script>
import { getUserData, getPortalLists } from '@/assets/js/ajax.js'
import router from '@/router'
export default {
  name: 'login',
  components: {
  },
  methods: {
  },
  mounted(){
    Bridge.setAppID("21216");
    Bridge.tryLogin(function(data2){
      if (!data2) {
        data2 = {};
        data2.openid = "c92d6478259631360f0578e0647aac92";
      }
      getUserData(data2.openId).done((data) => {
        if (data.state == 0) {
          localStorage.setItem('userId', data.order);
          if(!localStorage.getItem("factionId")){
            getPortalLists().done((data2) => {
              localStorage.setItem('factionId', data2.order[0].id);
              router.replace({path: 'index'});
            });
          } else {
            router.replace({path: 'index'});
          }
        } else {
          router.replace({path: 'public'})
        }
      });
    });
  }
}
</script>
