<!-- 教育培训 -->
<template>
  <div>
    <mt-loadmore class="scroller"
      :top-method="loadTop"
      :bottom-method="loadBottom"
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
        <article-list class="mv10" :articles="articles">
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
      topPic:require('@/assets/image/top_1.png')
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
      const factionId = localStorage.getItem('factionId');
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getMainData(page, factionId).done((data) => {
        if (data.order.length > 0) {
          this.$data.articles = [
            ...this.$data.articles,
            ...data.order,
          ];
          // this.$refs.scroller.donePullup();
          // if (data.order.length < 10) {
          //   this.$refs.scroller.disablePullup();
          // }
        } else {
          // this.$refs.scroller.disablePullup();
        }
      })
      this.$refs.loadmore.onBottomLoaded();
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

/*added by heinz on 04/26/17*/
.top-pic{
  display: block;
  width: 100%;
  height:50vw;
}
</style>
