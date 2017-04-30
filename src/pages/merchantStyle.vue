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
        <grid-item class="grid-item grid-item1" v-for="(themeTag, $index) in themeTags" :key="$index" @on-item-click="$root.openMobileWindow('tagArticle')">
          <img slot="icon" class="grid-item-icon" :src="themeTag.photo">
          <span slot="label" class="grid-item-label size12">{{themeTag.name}}</span>
        </grid-item>
      </grid>
      <div>
        <div class="article-style-1" v-for="article in articles">
          <img :src="article.photo">
          <div>
            <div>{{article.title}}</div>
            <div>{{article.in_time | time2}}</div>
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
      themeId: 0,
      themeTags:[],
      articles: [],
      allLoaded: false,
    }
  },
  methods: {
    onPulldownLoading(){
      this.$root.disabledLink = true;
      const themeId = this.$data.themeId;
      getThemeTag(themeId).done((data) => {
        if (data.state == 0) {
          this.$data.themeTags = data.order;
        }
      });
      getMainData(1, themeId).done((data) => {
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
      const factionId = localStorage.getItem('factionId');
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getMainData(page, factionId).done((data) => {
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
  },
  created() {
    this.$data.themeId = 149;
  },
  mounted() {
    this.onPulldownLoading();
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>

</style>
