<!-- 问卷调查 -->
<template>
  <div>
    <mt-loadmore class="scroller"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded[selectedIndex]"
      :autoFill="false"
      ref="loadmore"
    >
      <div>
        <x-img class="top-pic" :src="require('@/assets/image/wenjuanBanner.png')"></x-img>
        <tab class="tab-bar" active-color="#0084ff">
          <tab-item
            v-for="(theme, $index) in themeTags"
            @on-item-click="onItemClick($index)"
            :selected="selectedIndex === $index"
            :key="$index"
          >{{theme.name}}</tab-item>
        </tab>
        <div v-for="(theme, $index) in themeTags" :key="$index" v-show="selectedIndex === $index">
          <questionaire-list :articleList="articleList[$index]" :style="{'min-height': `${swiperHeight}px`}">
          </questionaire-list>
        </div>
        <!-- 历史问卷 -->
        <!-- <div v-if="tabIndex === 1">
          <questionaire-list :questionaires="questionaires | outdated"></questionaire-list>
        </div> -->
        <!-- 最新问卷 -->
        <!-- <div v-else>
          <questionaire-list :questionaires="questionaires"></questionaire-list>
        </div> -->
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
import { Scroller, XImg, Grid, GridItem, Tab, TabItem} from 'vux'
import { Loadmore } from 'mint-ui'
import questionaireList from '@/components/questionaireList.vue'
import { getVoteArticle, getThemeTag } from '@/assets/js/ajax.js'
export default {
  name: 'education',
  components: {
    Scroller, XImg, Grid, GridItem, Tab, TabItem,
    questionaireList,
    mtLoadmore: Loadmore
  },
  data() {
    return {
      themeId:148,
      selectedIndex:0,
      themeTags: [],
      tagIds: [],
      articleList: {},
      allLoaded: {},
      swiperHeight: window.innerHeight-54-window.innerWidth/2
    }
  },
  methods: {
    onItemClick(index) {
      this.selectedIndex = index;
      if (this.$data.articleList[index].length == 0) {
        this.loadTop(index);
      }
    },
    setAllLoaded(index, boolean){
      this.$data.allLoaded[index] = boolean;
      this.$data.allLoaded = {...this.$data.allLoaded};
    },
    loadTop(index){
      this.$root.disabledLink = true;
      const selectedIndex = index === undefined ? this.$data.selectedIndex : index;
      const tagId = this.$data.themeTags[selectedIndex].id;
      const portalId = localStorage.getItem('portalId');
      getVoteArticle(1, tagId, portalId).then((data) => {
        if (data.state == 0) {
          const _articleList = {
            ...this.$data.articleList,
          };
          _articleList[selectedIndex] = data.order;
          this.$data.articleList = _articleList;
          this.setAllLoaded(selectedIndex, false);
          if (data.order.length < 10) {
            this.setAllLoaded(selectedIndex, true);
          }
        }
        this.$refs.loadmore.onTopLoaded();
        this.$root.disabledLink = false;
      });

    },
    loadBottom(){
      this.$root.disabledLink = true;
      const selectedIndex = this.$data.selectedIndex;
      const tagId = this.$data.themeTags[selectedIndex].id;
      const page = Math.floor(this.$data.articleList[selectedIndex].length / 10) + 1;
      const portalId = localStorage.getItem('portalId');
      getVoteArticle(page, tagId, portalId).then((data) => {
        let pendingLength = data.order.length;
        if (pendingLength > 0) {
          const _articleList = {
            ...this.$data.articleList,
          };
          _articleList[selectedIndex] = _articleList[selectedIndex].concat(data.order);
          this.$data.articleList = _articleList;
        } else{
          this.setAllLoaded(selectedIndex, true);
        }
        if(pendingLength < 10) {
          this.setAllLoaded(selectedIndex, true);
        }
        this.$refs.loadmore.onBottomLoaded();
        this.$root.disabledLink = false;
      })
    }
  },
  created() {
    const themeId = this.$data.themeId;
    getThemeTag(themeId).then((data) => {
      if (data.state == 0) {
        this.$data.themeTags = data.order;
        data.order.forEach((item, index) => {
          this.$data.articleList[index] = [];
          this.$data.allLoaded[index] = false;
        });
        this.loadTop();
      }
    });
  },
  mounted() {
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>
.tab-bar{
  margin-bottom: 10px;
}
</style>
