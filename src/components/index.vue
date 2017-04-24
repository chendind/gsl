<template>
  <div>
    <scroller
      :use-pullup="true"
      :use-pulldown="true"
      height="100vh"
      :pulldown-config="pulldownConfig"
      :pullup-config="pullupConfig"
      :lock-x="true"
    >
      <div>
        <swiper>
          <swiper-item v-for="(carousel, $index) in carousels" :key="$index" class="carouselBox">
            <img :src="carousel.photo">
          </swiper-item>
        </swiper>
        <grid class="grid" :rows="5">
          <grid-item class="grid-item" v-for="(theme, $index) in themes" :key="$index">
            <img slot="icon" class="grid-item-icon" :src="theme.logo">
            <span slot="label" class="grid-item-label">{{theme.theme}}</span>
          </grid-item>
        </grid>
        <div class="unreadTipBox">
          <div class="unreadTip" onclick="goUnreadArticleList()">
            <span>1</span>条信息未查看<i class="fa fa-fw fa-angle-right"></i>
          </div>
        </div>
        <div class="articleList">
          <div class="weui-panel__bd article bg-white" v-for="(article, $articleIndex) in articles" :key="$articleIndex">
            <div class="weui-media-box weui-media-box_appmsg" :class="{'three-img-box': article.function == 1}">
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title" :class="{ 'mutilEllipsis-2': article.function == 3, 'ellipsis': article.function == 1 }">{{article.title}}</h4>
              </div>
              <flexbox justify="space-between" align="stretch" v-if="article.function == 1">
                <flexbox-item class="imgbox" :key="0">
                  <img :src="article.photo">
                </flexbox-item>
                <flexbox-item class="imgbox" :key="1">
                  <img :src="article.photo2">
                </flexbox-item>
                <flexbox-item class="imgbox" :key="2">
                  <img :src="article.photo3">
                </flexbox-item>
              </flexbox>
              <div v-if="article.function == 2 || article.function == 4">
                <img :src="article.photo">
              </div>
              <div class="weui-media-box__hd" v-if="article.function == 3">
                <img :src="article.photo" class="weui-media-box__thumb">
              </div>
              <div class="weui-media-box__bottom color-light-grey">
                <span>{{article.theme}}</span>
                <span class="mh10">04-20</span>
                <img class="guoqi mv10" :src="require('@/assets/image/guoqi.png')" alt="">
              </div>
            </div>
            <!-- <div class="weui-media-box weui-media-box_appmsg three-img-box">
              <div class="weui-media-box__bd">
                <h4 class="weui-media-box__title ">{{article.title}}</h4>
              </div>

              <div class="weui-media-box__bottom color-light-grey">
                <span>通知</span>
                <span class="mh10">04-20</span>
                <img class="guoqi mv10" :src="require('@/assets/image/guoqi.png')" alt="">
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Panel, Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem } from 'vux'
import { getFollowState, getPortalLists, getPortalArticle, getPortalCarousel, getPortalTheme, getNewestMainData } from '@/assets/js/ajax.js'
import router from '@/router'
import $ from 'jquery'
export default {
  name: 'productInfo',
  components: {
    Panel, Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem
  },
  methods: {
    apply(){
      console.log('立即申请');
    },
    getNewestMainData(themes){
      getNewestMainData(themes).done((data) => {
        this.articles = data.order;
      });
    }

  },
  data () {
    return {
      carousels: [],
      themes: [],
      article_theme: [],
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
      articles: [],
    }
  },
  mounted() {
    const userId = localStorage.getItem('userId');
    const factionId = localStorage.getItem('factionId');
    if (!userId) {
      router.replace('login');
    }
    getFollowState(userId).done((data) => {
      if (data.state == 0) {
        $.when(
          getPortalArticle(factionId),
          getPortalCarousel(factionId),
          getPortalTheme(factionId)
        ).done((data1, data2, data3) => {
          if (data1[0].state == 0) {
            const articleTheme = data1[0].order.article_theme.map((item) => {
              return item.id;
            });
            localStorage.setItem('articleTheme', articleTheme);
            this.getNewestMainData(articleTheme);
          }
          if (data2[0].state == 0) {
            this.$data.carousels = data2[0].order.carousel;
          }
          if (data3[0].state == 0) {
            this.$data.themes = data3[0].order.theme;
          }
        })
      }
    });
  }
}
</script>

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
  color: #999;
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
.grid-item{
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
