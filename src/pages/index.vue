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
          <swiper-item v-for="n in Math.ceil(themes.length / (themeLayout.column * themeLayout.row))" :key="n">
            <grid class="grid theme-bar bg-white no-before no-after" :rows="themeLayout.column">
              <grid-item
                class="grid-item grid-item1 no-before"
                v-for="(theme, $index) in themes.slice((n-1) * themeLayout.column * themeLayout.row, n * themeLayout.column * themeLayout.row)"
                :key="$index"
                @on-item-click="goTheme(theme)"
              >
                <img slot="icon" class="grid-item-icon" :src="theme.logo">
                <span slot="label" class="grid-item-label">{{theme.theme}}</span>
              </grid-item>
            </grid>
          </swiper-item>
        </swiper>
        <grid class="grid theme-bar bg-white no-before no-after" :rows="themeLayout.column" v-if="themeLayout.ispagination === 'false' || !themeLayout.ispagination">
          <grid-item class="grid-item grid-item1 no-before" v-for="(theme, $index) in themes" :key="$index" @on-item-click="goTheme(theme)">
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
    <div class="scroll-box portalListsBox pd5" v-show="showPortalListBox">
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
import { Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem } from 'vux'
import { Loadmore } from 'mint-ui';
import { getSubscription, getPortalLists, getPortalArticle, getPortalCarousel, getPortalTheme, getMainData, getUnreadList } from '@/assets/js/ajax.js'
import articleList from '@/components/articleList.vue'
import router from '@/router'
import $ from 'jquery'
export default {
  name: 'productInfo',
  components: {
    Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem, articleList,
    mtLoadmore: Loadmore,
  },
  methods: {
    getNewestMainData(){
      this.$root.disabledLink = true;
      getMainData(1, this.$data.articleThemes).then((data) => {
        this.$data.articles = data.order;
        this.$refs.loadmore.onTopLoaded();
        this.$data.allLoaded = false;
        this.$root.disabledLink = false;
      });
    },
    getMoreMainData(){
      this.$root.disabledLink = true;
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getMainData(page, this.$data.articleThemes).then((data) => {
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
      getUnreadList(1, this.$data.portalId).then((data) => {
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
      Promise.all([
        getPortalArticle(portalId),
        getPortalCarousel(portalId),
        getPortalTheme(portalId),
      ]).then(([data1, data2, data3]) => {
        if (data1.state == 0) {
          this.$data.articleThemes = data1.order.article_theme.map((item) => {
            return item.id;
          });
          localStorage.setItem('themeIds', JSON.stringify(this.$data.articleThemes));
          this.getNewestMainData();
        }
        if (data2.state == 0) {
          this.$data.carousels = data2.order.carousel;
        }
        if (data3.state == 0) {
          this.$data.themes = data3.order.theme.map((item, index) => {
            let url;
            switch(item.id - 0){
              case 151: url = 'mutualAid'; break; // 生活互助
              case 146: url = 'policy'; break; // 政策解读
              case 147: url = 'education'; break; // 教育培训
              case 149: url = 'merchantStyle'; break; // 杭商风采
              case 178: url = 'mailbox'; break; // 主席信箱
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
          this.$data.themeLayout = data3.order.theme_layout;
        }
        this.$refs.loadmore.onTopLoaded();
      })
    },
    onPulldownLoading(){
      this.allRefresh();
    },
    onPullupLoading(){
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
          // this.$vux.alert.show({
          //   title: '提示',
          //   content: '游客暂不支持咨询服务！',
          //   onShow () {},
          //   onHide () {}
          // });
          // return;
          this.$root.openMobileWindow('http://gsl.beyondin.com');
          return;
        }
        // 获得是否订阅公众号
        getSubscription(localStorage.getItem('userId')).then((data) => {
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
    this.allRefresh();
    if (this.$data.portalLists.length > 1) {
      Bridge.addMobileWindowButton('切换',() => {
        this.$root.isApp&&this.togglePortalBox();
        return true;
      });
    } else {
      // Bridge.addMobileWindowButton('',() => {
      //   return true;
      // });
    }
    window.tpb = this.togglePortalBox;
  },
  updated() {
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
  position: fixed;
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
