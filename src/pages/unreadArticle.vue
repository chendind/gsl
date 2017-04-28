<!-- 最新消息 -->
<template>
  <div>
    <mt-loadmore
      :top-method="onPulldownLoading"
      :bottom-method="onPullupLoading"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <article-list :articles="articles"></article-list>
    </mt-loadmore>
  </div>
</template>
<script>
import { Scroller, Flexbox, FlexboxItem } from 'vux'
import { Loadmore } from 'mint-ui';
import articleList from '@/components/articleList.vue'
import { getUnreadList } from '@/assets/js/ajax.js'
export default {
  name: 'unreadArticle',
  components: {
    Scroller, Flexbox, FlexboxItem, articleList,
    mtLoadmore: Loadmore,
  },
  data() {
    return {
      articles: [],
      allLoaded: false,
    }
  },
  methods: {
    onPulldownLoading(){
      this.$root.disabledLink = true;
      const factionId = localStorage.getItem('factionId');
      getUnreadList(1, factionId).done((data) => {
        if (data.state == 0) {
          this.$data.articles = data.order;
          this.$refs.loadmore.onTopLoaded();
          this.$data.allLoaded = false;
          if (data.order.length < 10) {
            this.$data.allLoaded = true;
          }
        }
        this.$root.disabledLink = false;
      })
    },
    onPullupLoading(){
      this.$root.disabledLink = true;
      const factionId = localStorage.getItem('factionId');
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getUnreadList(page, factionId).done((data) => {
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
    }
  },
  mounted() {
    this.onPulldownLoading()
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>

</style>
