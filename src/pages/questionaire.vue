<!-- 问卷调查 -->
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
      <div>
        <x-img class="top-pic" :src="topPic"></x-img>
        <tab active-color="#0084ff">
          <tab-item selected @on-item-click="onItemClick">最新问卷</tab-item>
          <tab-item @on-item-click="onItemClick">历史问卷</tab-item>
        </tab>
        <!-- 历史问卷 -->
        <div v-if="numb === 1">
          历史问卷
        </div>
        <!-- 最新问卷 -->
        <div v-else>
          <questionaire-sheet></questionaire-sheet>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import { Scroller, XImg, Grid, GridItem, Tab, TabItem} from 'vux'
import articleList from '@/components/articleList.vue'
import questionaireSheet from '@/components/questionaireSheet.vue'
import $ from 'jquery'
import { getUnreadList, getMainData, getThemeTag } from '@/assets/js/ajax.js'
export default {
  name: 'education',
  components: {
    Scroller, XImg, Grid, GridItem, Tab, TabItem,
    articleList, questionaireSheet
  },
  data() {
    return {
      numb:0,
      themeTags:[],
      articles: [],
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
      topPic:'http://portal.xiyoukeji.com/webTest/source/img/wenjuanBanner.png'
    }
  },
  methods: {
    onItemClick:function (n) {
      this.numb = n
    },
    onPulldownLoading(){
      const themeId = localStorage.getItem('themeId');
      getMainData(1, themeId).done((data) => {
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
    this.onPulldownLoading();
  },
  updated() {
    this.$refs.scroller.reset();
  }
}
</script>
<style lang='less' scoped>
/*original*/
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

/*added by heinz on 04/26/17*/
.top-pic{
  display: block;
  width: 100%;
  height:50vw;
}

.theme-bar{
  margin-bottom:13px;
}
</style>