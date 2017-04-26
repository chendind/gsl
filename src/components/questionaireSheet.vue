<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media">
        <div class="mui-media-body">
          <p class="mui-ellipsis">
            <span>关于杭商之家APP功能调查问卷</span>
          </p>
          <span class="time_show infoShow">
            <img src="" class="little_icon">
            <span>2017-04-28</span>
          </span>
          <span class="user_show infoShow"><img src="" class="little_icon"><span class="add_user">9</span><span>人参与</span></span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
import { getPortalArticle } from '@/assets/js/ajax.js'
export default {
  name: 'questionaireSheet',
  components: {
    Flexbox, FlexboxItem
  },
  methods: {

  }
}
</script>
<style lang='less'>

</style>
<style type="text/css">
  @import 'http://portal.xiyoukeji.com/webTest/source/plunges/mui/css/mui.min.css';
</style>










