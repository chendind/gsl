<!-- 标签文章 -->
<template>
  <div>
    <scroller
      :use-pullup="true"
      :use-pulldown="true"
      height="100vh"
      :pulldown-config="pulldownConfig"
      :pullup-config="pullupConfig"
      :lock-x="true"
      ref="scroller"
      @on-pulldown-loading="onPulldownLoading"
      @on-pullup-loading="onPullupLoading"
    >
      <article-list :articles="articles"></article-list>
    </scroller>
  </div>
</template>
<script>
import { Scroller, Flexbox, FlexboxItem } from 'vux'
import articleList from '@/components/articleList.vue'
import { getUnreadList } from '@/assets/js/ajax.js'
export default {
  name: 'tagArticle',
  components: {
    Scroller, Flexbox, FlexboxItem, articleList
  },
  data() {
    return {
      articles: [],
      pulldownConfig: {
        content: 'Pull Down To Refresh',
        height: 60,
        autoRefresh: false,
        downContent: '下拉刷新',
        upContent: '释放自动刷新',
        loadingContent: '<i class="fa fa-fw fa-spinner fa-spin"></i>正在刷新...',
        clsPrefix: 'xs-plugin-pulldown-'
      },
      pullupConfig: {
        content: 'Pull Up To Refresh',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '上拉加载更多',
        upContent: '释放自动加载',
        loadingContent: '<i class="fa fa-fw fa-spinner fa-spin"></i>正在刷新...',
        clsPrefix: 'xs-plugin-pullup-'
      },
    }
  },
  methods: {
    onPulldownLoading(){
      const factionId = localStorage.getItem('factionId');
      getUnreadList(1, factionId).done((data) => {
        if (data.state == 0) {
          this.$data.articles = data.order;
          this.$refs.scroller.donePulldown();
          this.$refs.scroller.enablePullup();
        }
      })
    },
    onPullupLoading(){
      const factionId = localStorage.getItem('factionId');
      const page = Math.floor(this.$data.articles.length / 10) + 1;
      getUnreadList(page, factionId).done((data) => {
        if (data.order.length > 0) {
          this.$data.articles = [
            ...this.$data.articles,
            ...data.order,
          ];
          this.$refs.scroller.donePullup();
          if (data.order.length < 10) {
            this.$refs.scroller.disablePullup();
          }
        } else {
          this.$refs.scroller.disablePullup();
        }
      })
    }
  },
  mounted() {
    this.onPulldownLoading()
  },
  updated() {
    this.$refs.scroller.reset();
  }
}
</script>
<style lang='less' scoped>

</style>
