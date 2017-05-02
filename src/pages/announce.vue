<!-- 通知公告 -->
<template>
  <div>
    <tab class="tab-bar" active-color="#0084ff">
      <tab-item selected @on-item-click="onItemClick">通知</tab-item>
      <tab-item @on-item-click="onItemClick">公告</tab-item>
    </tab>
    <!-- 公告 -->
    <div v-if="tabIndex === 1">
      公告
    </div>
    <!-- 通知 -->
    <div v-else>
      <mt-loadmore 
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
      >
        <article-list :articles="articles">
        </article-list>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import { Loadmore } from 'mint-ui'
import articleList from '@/components/articleList.vue'
import { getMainData, getThemeTag, getTagArticle} from '@/assets/js/ajax.js'
import $ from 'jquery'
export default {
  name: 'announce',
  components: {
    Tab, TabItem, 
    articleList, 
    mtLoadmore: Loadmore
  },
  data() {
    return {
      themeId:144,
      tabIndex:0,
      articles:[],
      tagIds:[],
      allLoaded:false
    }
  },
  methods: {
    onItemClick(n) {
      this.tabIndex = n;
    },
    loadTop(){
      const themeId = this.$data.themeId;
      const tabIndex = this.$data.tabIndex;
      getThemeTag(themeId).done((data) => {
        if (data.state == 0) {
          this.$data.themeTags = data.order;
          data.order.forEach(item => {
            this.$data.tagIds.push(item.id);
          })
        }
      });
      $.ajax({
          url: '/home/article/lists',
          type:'post',
          data: {
            tag_id:546,
            page:1,
            number:10,
          },
          success:function(data){console.log(data)}
      })
      let tagIds = this.$data.tagIds;
      getTagArticle(546,144).done((data) => {
        console.log(data)
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
  updated() {
  }
}
</script>
<style lang='less' scoped>
  .tab-bar{
    margin-bottom:11px;
  }
</style>
