<!-- 政策解读 -->
<template>
  <div>
    <mt-loadmore class="scroller"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    > 
      <div>
        <x-img class="top-pic" :src="topPic"></x-img>
        <grid class="grid theme-bar bg-white" :rows="5">
          <grid-item class="grid-item grid-item1" v-for="(themeTag, $index) in themeTags" :key="$index" @on-item-click="$root.openMobileWindow('tagArticle')">
            <img slot="icon" class="grid-item-icon" :src="themeTag.photo">
            <span slot="label" class="grid-item-label">{{themeTag.name}}</span>
          </grid-item>
        </grid>
        <article-list  :articles="articles">
        </article-list>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
import { XImg, Grid, GridItem} from 'vux'
import { Loadmore } from 'mint-ui';
import articleList from '@/components/articleList.vue'
import $ from 'jquery'
import { getMainData, getThemeTag } from '@/assets/js/ajax.js'
export default {
  name: 'education',
  components: {
    XImg, Grid, GridItem,
    articleList,
    mtLoadmore: Loadmore
  },
  data() {
    return {
      themeId:146,
      themeTags:[],
      articles: [],
      allLoaded:false,
      topPic:require('@/assets/image/zcBanner.png')
    }
  },
  methods: {
    loadTop(){
      const themeId = this.$data.themeId;
      getThemeTag(themeId).done((data) => {
        if (data.state == 0) {
          this.$data.themeTags = data.order;
        }
      });
      getMainData(1, themeId).done((data) => {
        if (data.state == 0) {
          this.$data.articles = data.order;
        }
      });
      this.$refs.loadmore.onTopLoaded();

    },
    loadBottom(){
      const themeId = this.$data.themeId;
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getMainData(page, themeId).done((data) => {
        let pendingLength = data.order.length;
        if (pendingLength > 0) {
          this.$data.articles = [
            ...this.$data.articles,
            ...data.order,
          ];
          this.$refs.loadmore.onBottomLoaded();
        }else{
          this.$data.allLoaded = true;
        }
        if(pendingLength < 10) {
          this.$data.allLoaded = true;
        }
      })
    }
  },
  mounted() {
    this.loadTop();
  },
  // updated() {
  //   this.$refs.scroller.reset();
  // }
}
</script>
<style lang='less' scoped>
.xs-container{
  min-height: 100vh;
}

.top-pic{
  display: block;
  width: 100%;
  height:50vw;
}
</style>
