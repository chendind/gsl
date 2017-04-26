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
        <swiper>
          <swiper-item v-for="(carousel, $index) in carousels" :key="$index" class="carouselBox">
            <img :src="carousel.photo">
          </swiper-item>
        </swiper>
        <grid class="grid bg-white no-before no-after" :rows="5">
          <grid-item class="grid-item grid-item1 no-before no-after" v-for="(theme, $index) in themes" :key="$index" @on-item-click="setItem('themeId',theme.id);$root.openMobileWindow(theme.url, theme.theme)">
            <img slot="icon" class="grid-item-icon" :src="theme.logo">
            <span slot="label" class="grid-item-label">{{theme.theme}}</span>
          </grid-item>
        </grid>
        <div class="unreadTipBox">
          <div
            class="unreadTip"
            v-show="unreadNumber>0"
            @click="$root.openMobileWindow('unreadArticle', '最新消息', getUnreadList)"
          >
            {{unreadNumber}}条信息未查看<i class="fa fa-fw fa-angle-right"></i>
          </div>
        </div>
        <article-list :articles="articles" :showDateoutLabel="false"></article-list>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Panel, Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem } from 'vux'
import { getFollowState, getPortalLists, getPortalArticle, getPortalCarousel, getPortalTheme, getMainData, getUnreadList } from '@/assets/js/ajax.js'
import articleList from '@/components/articleList.vue'
import router from '@/router'
import $ from 'jquery'
export default {
  name: 'productInfo',
  components: {
    Panel, Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem, articleList
  },
  methods: {
    apply(){
      console.log('立即申请');
    },
    getNewestMainData(){
      getMainData(1, this.$data.articleThemes).done((data) => {
        this.$data.articles = data.order;
        this.$refs.scroller.donePulldown();
        this.$refs.scroller.enablePullup();
      });
    },
    getMoreMainData(){
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getMainData(page, this.$data.articleThemes).done((data) => {
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
      });
    },
    getUnreadList(){
      const factionId = localStorage.getItem('factionId');
      getUnreadList(1, factionId).done((data) => {
        if (data.state == 0) {
          this.$data.unreadNumber = data.open_count;
        }
      })
    },
    allRefresh(){
      const userId = localStorage.getItem('userId');
      const factionId = localStorage.getItem('factionId');
      if (!userId) {
        router.replace('login');
      }
      getFollowState(userId).done((data) => {
        if (data.state == 0) {
          this.getUnreadList();
          $.when(
            getPortalArticle(factionId),
            getPortalCarousel(factionId),
            getPortalTheme(factionId),
          ).done((data1, data2, data3) => {
            if (data1[0].state == 0) {
              this.$data.articleThemes = data1[0].order.article_theme.map((item) => {
                return item.id;
              });
              localStorage.setItem('articleThemes', this.$data.articleThemes);
              this.getNewestMainData();
            }
            if (data2[0].state == 0) {
              this.$data.carousels = data2[0].order.carousel;
            }
            if (data3[0].state == 0) {
              this.$data.themes = data3[0].order.theme.map((item, index) => {
                let url;
                switch(item.id - 0){
                  case 151: url = 'teamwork'; break;
                  case 146: url = 'policy'; break; // 政策解读
                  case 147: url = 'education'; break; // 教育培训
                  case 149: url = 'educationTraining'; break;
                  case 178: url = 'mailBoxList'; break;
                  case 143: url = 'summary'; break; // 市联概况
                  case 144: url = 'announce'; break; // 通知公告
                  case 148: url = 'questionaire'; break; // 问卷调查
                  case 177: url = 'trade'; break; // 招商经贸
                  default: url = `themeList?id=${item.id}`;
                }
                return {
                  ...item,
                  url: item.link || url,
                }
              });
            }
            this.$refs.scroller.donePulldown();
          })
        }
      });
    },
    onPulldownLoading(){
      console.log('onPulldownLoading');
      this.allRefresh();
    },
    onPullupLoading(){
      console.log('onPullupLoading');
      this.getMoreMainData(this.$data.page);
    },
    setItem(a,b){
      localStorage.setItem(a,b);
    }
  },
  data () {
    return {
      carousels: [],
      themes: [],
      articleThemes: [],
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
      unreadNumber: 0,
    }
  },
  mounted() {
    this.allRefresh();
  },
  updated() {
    this.$refs.scroller.reset();
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
}
.grid-item{
  padding: 2px 10px !important;
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
