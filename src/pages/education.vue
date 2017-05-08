<!-- 教育培训 -->
<template>
  <div>
    <mt-loadmore class="scroller"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <div>
        <x-img class="top-pic" :src="require('@/assets/image/top_1.png')"></x-img>
        <grid class="grid theme-bar bg-white" :rows="5">
          <grid-item class="grid-item grid-item1" v-for="(themeTag, $index) in themeTags" :key="$index" @on-item-click="goTagArticle(themeTag)">
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
      themeId:147,
      themeTags:[],
      articles: [],
      allLoaded:false,
    }
  },
  methods: {
    loadTop(){
      const themeId = this.$data.themeId;
      this.$root.disabledLink = true;
      getThemeTag(themeId).then((data) => {
        if (data.state == 0) {
          this.$data.themeTags = data.order;
        }
      });
      getMainData(1, themeId).then((data) => {
        if (data.state == 0) {
          this.$data.articles = data.order;
          this.$data.allLoaded = false;
          if (data.order.length < 10) {
            this.$data.allLoaded = true;
          }
        }
        this.$root.disabledLink = false;
        this.$refs.loadmore.onTopLoaded();
      });
    },
    loadBottom(){
      const themeId = this.$data.themeId;
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      this.$root.disabledLink = true;
      getMainData(page, themeId).then((data) => {
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
        this.$root.disabledLink = false;
      })
    },
    goTagArticle(themeTag){
      const query = this.$root.encodeObj({
        tagId: themeTag.id
      });
      this.$root.openMobileWindow(`tagArticle?${query}`, themeTag.name);
    }
  },
  mounted() {
    this.loadTop();
  },
}
</script>
<style lang='less' scoped>

/*added by heinz on 04/26/17*/

</style>
