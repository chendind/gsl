<!-- 标签文章 -->
<template>
  <div>
    <mt-loadmore
      :top-method="onPulldownLoading"
      :bottom-method="onPullupLoading"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <article-list :articles="articles" style="min-height: 100vh"></article-list>
    </mt-loadmore>
  </div>
</template>
<script>
import { Scroller, Flexbox, FlexboxItem } from 'vux'
import { Loadmore } from 'mint-ui';
import articleList from '@/components/articleList.vue'
import { getTagArticle } from '@/assets/js/ajax.js'
export default {
  name: 'tagArticle',
  components: {
    Scroller, Flexbox, FlexboxItem, articleList
  },
  data() {
    return {
      tagId: 0,
      articles: [],
      allLoaded: false,
    }
  },
  methods: {
    onPulldownLoading(){
      const tagId = this.$data.tagId;
      const portalId = localStorage.getItem('portalId');
      this.$root.disabledLink = true;
      getTagArticle(1, tagId, portalId).then((data) => {
        if (data.state == 0) {
          this.$data.articles = data.order;
          this.$data.allLoaded = false;
          if (data.order.length < 10) {
            this.$data.allLoaded = true;
          }
        }
        this.$refs.loadmore.onTopLoaded();
        this.$root.disabledLink = false;
      })
    },
    onPullupLoading(){
      const tagId = this.$data.tagId;
      const portalId = localStorage.getItem('portalId');
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      this.$root.disabledLink = true;
      getTagArticle(page, tagId, portalId).then((data) => {
        if (data.order.length > 0) {
          this.$data.articles = [
            ...this.$data.articles,
            ...data.order,
          ];

          if (data.order.length < 10) {
            this.$data.allLoaded = true;
          }
        } else {
          this.$data.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();
        this.$root.disabledLink = false;
      })
    }
  },
  mounted() {
    const query = this.$root.getQueryData() || {};
    this.$data.tagId = query.tagId || 0;
    this.onPullupLoading()
  }
}
</script>
<style lang='less' scoped>

</style>
