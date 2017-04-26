<!-- 教育培训 -->
<template>
  <div>
    <scroller
      :use-pullup="true"
      :use-pulldown="true"
      height="100vh"
      :pulldown-config="pulldownConfig"
      :pullup-config="pullupConfig"
      :lock-x="true"
      ref="scroller"
      @on-pulldown-loading="onPulldownLoading"
      @on-pullup-loading="onPullupLoading"
    > 
      <x-img class="top-pic" :src="test"></x-img>
      <grid class="grid theme-bar" :rows="5">
        <grid-item class="grid-item grid-item1" v-for="(theme, $index) in themes" :key="$index" @on-item-click="$root.openMobileWindow(theme.url, theme.theme)">
          <img slot="icon" class="grid-item-icon" :src="theme.photo">
          <span slot="label" class="grid-item-label">{{theme.name}}</span>
        </grid-item>
      </grid>
      <article-list :articles="articles">
      </article-list>
    </scroller>
  </div>
</template>
<script>
import { Scroller, Flexbox, FlexboxItem, XImg, Grid, GridItem} from 'vux'
import ArticleList from '../components/articleList.vue'
import { getUnreadList } from '@/assets/js/ajax.js'
export default {
  name: 'education',
  components: {
    Scroller, Flexbox, FlexboxItem, XImg, Grid, GridItem,
    ArticleList
  },
  data() {
    return {
      themes:[
        {
            "name": "党建教育", 
            "id": 50, 
            "photo": "/icon_dangjian_default@2x.png"
        }, 
        {
            "name": "政策法规", 
            "id": 51, 
            "photo": "/icon_zhengce_default@2x.png"
        }, 
        {
            "name": "企业管理", 
            "id": 52, 
            "photo": "/icon_qiye_default@2x.png"
        }, 
        {
            "name": "音视频", 
            "id": 417, 
            "photo": "/icon_yinshipin_default@2x.png"
        }, 
        {
            "name": "文档", 
            "id": 551, 
            "photo": "/icon_wendang_default@2x.png"
        }
    ],
      articles: [{
            "id": 778, 
            "title": "爱在党旗下 永远跟党走——戎威远安全服务集团党建工作侧记", 
            "author": "杭州市工商联", 
            "photo": "/Uploads/20170309/_58c12be22d216.jpeg", 
            "photo2": null, 
            "photo3": null, 
            "photo_photo": null, 
            "function": 3, 
            "link": "", 
            "in_time": 1489054690, 
            "end_time": 1489542859, 
            "isend": 1, 
            "theme": "教育培训", 
            "comment_count": 0, 
            "like_count": 0, 
            "read_count": 13, 
            "measure_count": 0, 
            "value": [
                {
                    "tag": "企业管理", 
                    "tag_id": 52
                }
            ], 
            "isread": 1, 
            "isnew": 0
        }],
      pulldownConfig: {
        content: 'Pull Down To Refresh',
        height: 60,
        autoRefresh: false,
        downContent: '下拉刷新',
        upContent: '释放自动刷新',
        loadingContent: '<i class="fa fa-fw fa-spinner fa-spin"></i>正在刷新...',
        clsPrefix: 'xs-plugin-pulldown-'
      },
      pullupConfig: {
        content: 'Pull Up To Refresh',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '上拉加载更多',
        upContent: '释放自动加载',
        loadingContent: '<i class="fa fa-fw fa-spinner fa-spin"></i>正在刷新...',
        clsPrefix: 'xs-plugin-pullup-'
      },
      test:'http://portal.xiyoukeji.com/webTest/source/img/top_new.png'
    }
  },
  methods: {
    onPulldownLoading(){
      const factionId = localStorage.getItem('factionId');
      getUnreadList(1, factionId).done((data) => {
        if (data.state == 0) {
          this.$data.articles = data.order;
          this.$refs.scroller.donePulldown();
          this.$refs.scroller.enablePullup();
        }
      })
    },
    onPullupLoading(){
      const factionId = localStorage.getItem('factionId');
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getUnreadList(page, factionId).done((data) => {
        if (data.order.length > 0) {
          this.$data.articles = [
            ...this.$data.articles,
            ...data.order,
          ];
          this.$refs.scroller.donePullup();
          if (data.order.length < 10) {
            this.$refs.scroller.disablePullup();
          }
        } else {
          this.$refs.scroller.disablePullup();
        }
      })
    }
  },
  mounted() {
    // this.onPulldownLoading()
  },
  updated() {
    this.$refs.scroller.reset();
  }
}
</script>
<style lang='less' scoped>
  .top-pic{
    display: block;
    width: 100%;
    height:50vw;
  }

  .theme-bar{
    margin-bottom:13px;
  }
</style>


<style lang='less' scoped>
.carouselBox{
  &>img{
    display: block;
    width: 100%;
    height: 100%;
  }
}
.grid{
  padding: 10px 0 5px;
  background-color: #fff;
}
.grid-item{
  padding: 2px 10px !important;
  &:before{
    display: none;
  }
  &:after{
    display: none;
  }
}
.grid-item-icon{

}
.grid-item-label{
  font-size: 12px;
}
.unreadTipBox {
  margin: 10px 0;
  text-align: center;
}
.unreadTip {
  display: inline-block;
  padding: 8px 20px;
  font-size: 12px;
  border-radius: 14px;
  background-color: #cecfd0;
  color: #fff;
  line-height: 1;
}


</style>
<style lang='less'>
.grid-item1{
  .weui-grid__icon{
    width: 9.5vw;
    height: 9.5vw;
  }
  .weui-grid__label{
    margin-top: 0!important;
  }
}
.xs-container{
  min-height: 100vh;
}
</style>