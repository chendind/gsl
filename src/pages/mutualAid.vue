<!-- 生活互助 -->
<template>
  <div>
    <mt-loadmore class="scroller"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <div style="min-height: 100vh">
        <grid class="grid theme-bar bg-white" :rows="4">
          <grid-item class="grid-item grid-item2" v-for="(themeTag, $index) in themeTags" :key="$index" @on-item-click="goTagArticle(themeTag)">
            <img slot="icon" class="grid-item-icon" :src="themeTag.photo">
            <span slot="label" class="grid-item-label">{{themeTag.name}}</span>
          </grid-item>
        </grid>
        <article-list-mutual :articles="articles"></article-list-mutual>
      </div>
    </mt-loadmore>
    <div class="writing-button">
      <div class="round-button" style="position: relative;z-index: 1;">
        <img :src="require('@/assets/image/edit_n.png')" @click="$root.openMobileWindow('addingAidInfo', '新增生活互助文章')">
      </div>
    </div>
  </div>
</template>
<script>
import { XImg, Grid, GridItem} from 'vux'
import { Loadmore } from 'mint-ui';
import articleListMutual from '@/components/articleListMutual.vue'
import $ from 'jquery'
import { getMutualList, getThemeTag } from '@/assets/js/ajax.js'

export default {
  name: 'mutualAid',
  components: {
    XImg, Grid, GridItem,
    articleListMutual,
    mtLoadmore: Loadmore
  },
  data() {
    return {
      themeId:151,
      themeTags:[],
      articles: [],
      allLoaded:false,
    }
  },
  methods: {
    loadTop(){
      const themeId = this.$data.themeId;
      const portalId = localStorage.getItem('portalId');
      this.$root.disabledLink = true;
      getThemeTag(themeId).then((data) => {
        if (data.state == 0) {
          this.$data.themeTags = data.order;
        }
      });
      getMutualList(1, portalId).then((data) => {
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
      const portalId = localStorage.getItem('portalId');
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      this.$root.disabledLink = true;
      getMutualList(page, portalId).then((data) => {
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
      // const query = this.$root.encodeObj({
      //   tagId: themeTag.id
      // });
      // this.$root.openMobileWindow(`tagArticle?${query}`, themeTag.name);
    }
  },
  mounted() {
    this.loadTop();
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>
.writing-button{
  position: fixed;
  bottom: 80px;
  right: 20px;
}
.round-button{
  &>img{
    display: block;
    width: 53px;
    height: 53px;
  }
}
</style>
