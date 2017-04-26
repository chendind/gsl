<!-- 教育培训 -->
<template>
  <div>
    <x-img class="top-pic" :src="test"></x-img>
    <grid class="grid" :rows="5">
      <grid-item class="grid-item grid-item1" v-for="(theme, $index) in themes" :key="$index" @on-item-click="$root.openMobileWindow(theme.url, theme.theme)">
        <img slot="icon" class="grid-item-icon" :src="theme.logo">
        <span slot="label" class="grid-item-label">{{theme.theme}}</span>
      </grid-item>
    </grid>
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
      <div class="articleList">
        <div class="weui-panel__bd article bg-white" v-for="(article, $articleIndex) in articles" :key="$articleIndex">
          <div class="weui-media-box three-img-box" v-if="article.function == 1">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title ellipsis">{{article.title}}</h4>
            </div>
            <flexbox justify="space-between" align="stretch">
              <flexbox-item class="imgbox" :key="0">
                <img :src="article.photo">
              </flexbox-item>
              <flexbox-item class="imgbox" :key="1">
                <img :src="article.photo2">
              </flexbox-item>
              <flexbox-item class="imgbox" :key="2">
                <img :src="article.photo2">
              </flexbox-item>
            </flexbox>
            <div class="weui-media-box__bottom color-light-grey">
              <span>通知</span>
              <span class="mh10">04-20</span>
              <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" alt="">
            </div>
          </div>
          <div class="weui-media-box single-img-box" v-if="article.function == 2">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title mutilEllipsis-2">{{article.title}}</h4>
            </div>
            <div class="imgbox">
              <img :src="article.photo_photo">
            </div>
            <div class="weui-media-box__bottom color-light-grey">
              <span>{{article.theme}}</span>
              <span class="mh10">04-20</span>
              <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" alt="">
            </div>
          </div>
          <div class="weui-media-box weui-media-box_appmsg" v-if="article.function == 3">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title mutilEllipsis-2">{{article.title}}</h4>
            </div>
            <div class="weui-media-box__hd" v-if="article.function == 3">
              <img :src="article.photo" class="weui-media-box__thumb">
            </div>
            <div class="weui-media-box__bottom color-light-grey">
              <span>{{article.theme}}</span>
              <span class="mh10">04-20</span>
              <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" alt="">
            </div>
          </div>
          <div class="weui-media-box single-img-box" v-if="article.function == 4">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title mutilEllipsis-2"><i class="fa fa-fw fa-video-camera"></i>{{article.title}}</h4>
            </div>
            <div class="imgbox">
              <img :src="article.photo">
            </div>
            <div class="weui-media-box__bottom color-light-grey">
              <span>{{article.theme}}</span>
              <span class="mh10">04-20</span>
              <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" alt="">
            </div>
          </div>
          <div class="weui-media-box single-img-box" v-if="article.function == 5">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title mutilEllipsis-2">{{article.title}}</h4>
            </div>
            <div class="weui-media-box__bottom color-light-grey">
              <span>{{article.theme}}</span>
              <span class="mh10">04-20</span>
              <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" alt="">
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import { Scroller, Flexbox, FlexboxItem, XImg, Grid, GridItem} from 'vux'
import { getUnreadList } from '@/assets/js/ajax.js'
export default {
  name: 'unreadArticle',
  components: {
    Scroller, Flexbox, FlexboxItem, XImg, Grid, GridItem
  },
  data() {
    return {
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
    this.onPulldownLoading()
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
</style>
