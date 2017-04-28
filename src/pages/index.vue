<template>
  <div>
    <mt-loadmore
      :top-method="onPulldownLoading"
      :bottom-method="onPullupLoading"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <div>
        <swiper
          dots-position="center"
          :show-dots="carousels.length > 1"
        >
          <swiper-item v-for="(carousel, $index) in carousels" :key="$index" class="carouselBox">
            <img :src="carousel.photo">
          </swiper-item>
        </swiper>
        <swiper
          v-if="themeLayout.ispagination === 'true' || themeLayout.ispagination"
          dots-position="center"
          :height="`${themeLayout.row * 62 + 15}px`"
          class="bg-white"
          :show-dots="Math.ceil(themes.length / (themeLayout.column * themeLayout.row))>1"
        >
          <swiper-item v-for="n in Math.ceil(themes.length / (themeLayout.column * themeLayout.row))">
            <grid class="grid bg-white no-before no-after" :rows="themeLayout.column">
              <grid-item
                class="grid-item grid-item1 no-before no-after"
                v-for="(theme, $index) in themes.slice((n-1) * themeLayout.column * themeLayout.row, n * themeLayout.column * themeLayout.row)"
                :key="$index"
                @on-item-click="setItem('themeId',theme.id);goTheme(theme)"
              >
                <img slot="icon" class="grid-item-icon" :src="theme.logo">
                <span slot="label" class="grid-item-label">{{theme.theme}}</span>
              </grid-item>
            </grid>
          </swiper-item>
        </swiper>
        <grid class="grid bg-white no-before no-after" :rows="themeLayout.column" v-if="themeLayout.ispagination === 'false' || !themeLayout.ispagination">
          <grid-item class="grid-item grid-item1 no-before no-after" v-for="(theme, $index) in themes" :key="$index" @on-item-click="setItem('themeId',theme.id);goTheme(theme)">
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
    </mt-loadmore>
    <div class="scrollBox portalListsBox pd5" v-show="showPortalListBox">
      <flexbox
        :gutter="0"
        wrap="wrap"
      >
        <flexbox-item :span="6" v-for="(portal,$index) in portalLists" :key="$index">
          <div class="pd5">
            <div class="portal text-center size14 bg-white" @click="switchPortal(portal.id)">{{portal.name}}</div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Panel, Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem } from 'vux'
import { Loadmore } from 'mint-ui';
import { getSubscription, getPortalLists, getPortalArticle, getPortalCarousel, getPortalTheme, getMainData, getUnreadList } from '@/assets/js/ajax.js'
import articleList from '@/components/articleList.vue'
import router from '@/router'
import $ from 'jquery'
export default {
  name: 'productInfo',
  components: {
    Panel, Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem, articleList,
    mtLoadmore: Loadmore,
  },
  methods: {
    apply(){
      console.log('立即申请');
    },
    getNewestMainData(){
      this.$root.disabledLink = true;
      getMainData(1, this.$data.articleThemes).done((data) => {
        this.$data.articles = data.order;
        this.$refs.loadmore.onTopLoaded();
        this.$data.allLoaded = false;
        this.$root.disabledLink = false;
      });
    },
    getMoreMainData(){
      this.$root.disabledLink = true;
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getMainData(page, this.$data.articleThemes).done((data) => {
        if (data.order.length > 0) {
          this.$data.articles = [
            ...this.$data.articles,
            ...data.order,
          ];
          this.$refs.loadmore.onBottomLoaded();
          if (data.order.length < 10) {
            this.$data.allLoaded = true;
          }
        } else {
          this.$data.allLoaded = true;
        }
        this.$root.disabledLink = false;
      });
    },
    getUnreadList(){
      getUnreadList(1, this.$data.portalId).done((data) => {
        if (data.state == 0) {
          this.$data.unreadNumber = data.open_count;
        }
      })
    },
    allRefresh(){
      const userId = this.$data.userId;
      const portalId = this.$data.portalId;
      if (!userId) {
        router.replace('login');
      }
      // 获得未读消息
      this.getUnreadList();
      $.when(
        getPortalArticle(portalId),
        getPortalCarousel(portalId),
        getPortalTheme(portalId),
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
              case 151: url = 'mutualAid'; break; // 生活互助
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
          this.$data.themeLayout = data3[0].order.theme_layout;
        }
        this.$refs.loadmore.onTopLoaded();
      })
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
    },
    goTheme(theme){
      if (theme.id == 150) {
        // 用户点击了订阅服务
        if (localStorage.getItem('userType') == 'tourist') {
          // 判断用户是不是游客
          this.$vux.alert.show({
            title: '提示',
            content: '游客暂不支持咨询服务!',
            onShow () {},
            onHide () {}
          });
          return;
        }
        // 获得是否订阅公众号
        getSubscription(localStorage.getItem('userId')).done((data) => {
          if (data.state == 0) {
            Bridge.openSubscription('21415');
          } else {
            Bridge.openSubscriptionInfo('21415');
          }
        });
      } else {
        this.$root.openMobileWindow(theme.url, theme.theme)
      }
    },
    switchPortal(portalId){
      this.$data.portalId = portalId;
      localStorage.setItem('portalId', portalId);
      this.allRefresh();
      this.showPortalListBox = false;
    },
    togglePortalBox(){
      this.$data.showPortalListBox = !this.$data.showPortalListBox;
    }
  },
  data () {
    return {
      allLoaded: false,
      showPortalListBox: false,
      userId: localStorage.getItem('userId'),
      portalLists: JSON.parse(localStorage.getItem('portalLists')),
      portalId: localStorage.getItem('portalId'),
      carousels: [],
      themes: [],
      themeLayout: {
        column: 5,
        ispagination: false,
        row: 2,
      },
      articleThemes: [],
      articles: [],
      unreadNumber: 0,
    }
  },
  mounted() {
    console.log(`userType: ${localStorage.getItem('userType')}`)
    console.log(`userId: ${localStorage.getItem('userId')}`)
    this.allRefresh();
    if (this.$data.portalLists.length > 1) {
      Bridge.addMobileWindowButton('切换',() => {
        // this.togglePortalBox();
        return true;
      });
    } else {
      Bridge.addMobileWindowButton('',() => {
        return true;
      });
    }
    window.tpb = this.togglePortalBox;
  },
  updated() {
    // this.$refs.loadmore.reset();
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
.portalListsBox{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #efeff4;
  .portal{
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 8px;
  }
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
</style>
