<!-- 通知公告 -->
<template>
  <div>
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded[selectedIndex]"
      :autoFill="false"
      ref="loadmore"
    >
      <div>
        <tab class="tab-bar" active-color="#0084ff">
          <tab-item
            v-for="(theme, $index) in themeTags"
            @on-item-click="onItemClick($index)"
            :selected="selectedIndex === $index"
            :key="$index"
          >{{theme.name}}</tab-item>
        </tab>
        <div v-for="(theme, $index) in themeTags" :key="$index" v-show="selectedIndex === $index">
          <article-list :articles="articleList[$index]" :style="{'min-height': `${swiperHeight}px`}">
          </article-list>
        </div>
      </div>
    </mt-loadmore>
    <!-- <swiper v-model="selectedIndex" :show-dots="false" :height="`${swiperHeight}px`">
      <swiper-item v-for="(theme, $index) in themeTags" :key="$index" class="scroll-box swiper-item">
        <mt-loadmore
          :top-method="loadTop"
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded[$index]"
          :autoFill="false"
          ref="loadmore"
        >
          <article-list :articles="articleList[$index]" :style="{'min-height': `${swiperHeight}px`}">
          </article-list>
        </mt-loadmore>
      </swiper-item>
    </swiper> -->
  </div>
</template>
<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import { Loadmore } from 'mint-ui'
import articleList from '@/components/articleList.vue'
import { getThemeTag, getTagArticle} from '@/assets/js/ajax.js'
import $ from 'jquery'
export default {
  name: 'announce',
  components: {
    Tab, TabItem, Swiper, SwiperItem,
    articleList,
    mtLoadmore: Loadmore
  },
  data() {
    return {
      themeId:144,
      selectedIndex:0,
      themeTags: [],
      tagIds: [],
      articleList: {},
      allLoaded: {},
      swiperHeight: window.innerHeight-54
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
      getTagArticle(1, tagId, portalId).then((data) => {
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
      getTagArticle(page, tagId, portalId).then((data) => {
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
.swiper-item{
}
</style>
