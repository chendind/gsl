<!-- 杭商风采 -->
<template>
  <div>
    <mt-loadmore
      :top-method="onPulldownLoading"
      :bottom-method="onPullupLoading"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <grid class="grid theme-bar bg-white" :rows="5">
        <grid-item class="grid-item grid-item1" v-for="(themeTag, $index) in themeTags" :key="$index" @on-item-click="$root.openMobileWindow(themeTag.url || 'tagArticle')">
          <img slot="icon" class="grid-item-icon" :src="themeTag.photo">
          <span slot="label" class="grid-item-label size12">{{themeTag.name}}</span>
        </grid-item>
      </grid>
      <div class="mv10">
        <div class="article-style-1" v-for="article in articles" @click="goArticle(article)">
          <div class="cover" :style="{'background-image': `url(${article.photo || require('@/assets/image/hs.jpg')})`}"></div>
          <div class="meta color-white pd10">
            <div class="ellipsis size14">{{article.title}}</div>
            <div class="size12">{{article.in_time | time2}}</div>
          </div>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
import { Grid, GridItem} from 'vux'
import { Loadmore } from 'mint-ui';
import { getThemeTag, getMainData } from '@/assets/js/ajax.js'
export default {
  name: 'merchantStyle',
  components: {
    Grid, GridItem,
    mtLoadmore: Loadmore,
  },
  data() {
    return {
      themeId: 149,
      themeTags:[],
      articles: [],
      allLoaded: false,
    }
  },
  methods: {
    onPulldownLoading(){
      this.$root.disabledLink = true;
      const themeId = this.$data.themeId;
      getThemeTag(themeId).then((data) => {
        if (data.state == 0) {
          this.$data.themeTags = data.order.map((item) => {
            const tag = {...item}
            if (item.id == 561) {
              tag.url = 'http://wish.app.yunzz.com:8008/hs-table/page/hs-table-1.html';
            } else if (item.id == 562) {
              tag.url = 'http://wish.app.yunzz.com:8008/hs-table/page/hs-table-2.html';
            } else if (item.id == 563) {
              tag.url = 'http://wish.app.yunzz.com:8008/hs-table/page/hs-table-3.html';
            }
            return tag;
          });
        }
      });
      getMainData(1, themeId, 1).then((data) => {
        if (data.state == 0) {
          this.$data.articles = data.order;
          this.$refs.loadmore.onTopLoaded();
          this.$data.allLoaded = false;
          this.$root.disabledLink = false;
        }
      })
    },
    onPullupLoading(){
      this.$root.disabledLink = true;
      const themeId = this.$data.themeId;
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getMainData(page, themeId, 1).then((data) => {
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
      })
    },
    goArticle(article) {
      const query = this.$root.encodeObj({id: article.id})
      this.$root.openMobileWindow(`article?${query}`)
    }
  },
  mounted() {
    this.onPulldownLoading();
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>
.article-style-1{
  position:relative;
  .cover{
    display: block;
    width: 100%;
    height: 46vw;
    background-position: center;
    background-size: cover;
  }
  .meta{
    position: absolute;
    background-color: rgba(0,0,0,0.4);
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>
