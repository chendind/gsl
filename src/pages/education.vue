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
      <div>
        <x-img class="top-pic" :src="topPic"></x-img>
        <grid class="grid theme-bar bg-white" :rows="5">
          <grid-item class="grid-item grid-item1" v-for="(themeTag, $index) in themeTags" :key="$index" @on-item-click="$root.openMobileWindow('tagArticle')">
            <img slot="icon" class="grid-item-icon" :src="themeTag.photo">
            <span slot="label" class="grid-item-label">{{themeTag.name}}</span>
          </grid-item>
        </grid>
        <article-list class="mv10" :articles="articles">
        </article-list>
      </div>
    </scroller>
  </div>
</template>
<script>
import { Scroller, XImg, Grid, GridItem} from 'vux'
import articleList from '@/components/articleList.vue'
import $ from 'jquery'
import { getMainData, getThemeTag } from '@/assets/js/ajax.js'
export default {
  name: 'education',
  components: {
    Scroller, XImg, Grid, GridItem,
    articleList
  },
  data() {
    return {
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
      topPic:require('@/assets/image/top_1.png')
    }
  },
  methods: {
    onPulldownLoading(){
      const themeId = localStorage.getItem('themeId');
      getThemeTag(themeId).done((data) => {
        if (data.state == 0) {
          this.$data.themeTags = data.order;
        }
      });
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
      getMainData(page, factionId).done((data) => {
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
    },
    setItem(a,b){
      localStorage.setItem(a,b);
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
.xs-container{
  min-height: 100vh;
}

/*added by heinz on 04/26/17*/
.top-pic{
  display: block;
  width: 100%;
  height:50vw;
}
</style>
