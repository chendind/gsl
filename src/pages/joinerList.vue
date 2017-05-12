<!-- 报名列表 -->
<template>
  <div>
    <tab class="tab-bar" active-color="#0084ff">
      <tab-item selected>已报名人员</tab-item>
    </tab>
    <mt-loadmore class="scroller"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottomPullText="displayText"
      :bottomDropText="displayText"
      :bottomLoadingText="displayText"
      ref="loadmore"
    >
      <div :style="{'min-height': `${scrollMinHeight}px`}">
        <cell v-for="(user, $index) in voteInfo" :border-intent="true" :key="$index">
          <span slot="after-title" >
            <img  class="user-avatar" :src="user.avatar">
            {{user.user_name}}
          </span>
        </cell>
      </div>

    </mt-loadmore>
  </div>
</template>
<script>
import { Tab, TabItem, Cell } from 'vux'
import { Loadmore } from 'mint-ui';
import { getArticleVoteInfo } from '@/assets/js/ajax.js'
export default {
  name: 'joinerList',
  components: {
    Tab, TabItem, Cell,
    mtLoadmore: Loadmore
  },
  data() {
    return {
      articleId: 0,
      voteInfo:[],
      allLoaded:false,
      displayText:"没有更多数据了",
      scrollMinHeight: window.innerHeight - 44
    }
  },
  methods: {
    loadTop(){
      getArticleVoteInfo(this.$data.articleId).then((data) => {
        if(data.state == 0){
          this.$data.voteInfo = data.order.read;
          this.$refs.loadmore.onTopLoaded();
        }
      });
    },
    loadBottom(){
      this.$refs.loadmore.onBottomLoaded();
    }
  },
  created(){
    this.$data.articleId = this.$root.getQueryData().id;
  },
  mounted() {
    this.loadTop();
  }
}
</script>
<style lang='less' scoped>
.weui-cell{
  background-color: white;
}

.user-avatar{
  width: 45px!important;
  height: 45px!important;
  background-color: #ccc;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  margin-right: 20px;
}

.tab-bar{
  position: absolute;
  top:0;
  left:0;
  z-index:100;
  width:100%;
  height:44px;
}

.scroller{
  margin-top: 44px;
}
</style>
