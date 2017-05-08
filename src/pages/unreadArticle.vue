<!-- 最新消息 -->
<template>
  <div>
    <mt-loadmore
      :top-method="onPulldownLoading"
      :bottom-method="onPullupLoading"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
      class="full-page-box"
    >
      <article-list :articles="articles" style="min-height: 100vh"></article-list>
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
      const portalId = localStorage.getItem('portalId');
      getUnreadList(1, portalId).then((data) => {
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
      this.$root.disabledLink = true;
      const portalId = localStorage.getItem('portalId');
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getUnreadList(page, portalId).then((data) => {
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
    this.onPullupLoading();
    Bridge.customGoBack(function(){
        Bridge.closeMobileWindow();
    },'');
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>

</style>
