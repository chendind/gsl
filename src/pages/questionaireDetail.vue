<!-- 问卷详情 -->
<template>
  <div>
    <transition name="page1">
      <div v-show="!isQuestionaireShown" class="page1 full-page-box">
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottomDistance="bottomDistance"
          bottomPullText="上拉填写问卷"
          bottomDropText="释放进行问卷填写"
          bottomLoadingText=""
          ref="loadmore"
        >
          <div style="min-height: 100vh">
            <x-img class="top-pic" :src="require('@/assets/image/top_2.png')"></x-img>
            <cell class="questionaire-title" :title="detail.title" :border-intent="false">
            </cell>
            <cell :border-intent="false">
              <span slot="after-title">
                <img class="icon-xs" :src="require('@/assets/image/time_new.png')">
                <span class="release-date">
                  {{detail.in_time | time1}}
                </span>
              </span>
            </cell>
            <cell :border-intent="false">
              <span slot="after-title" @click="$root.openMobileWindow('joinerList')">
                <div class="user-info">
                  已报名<span class="vote-count">{{voteInfo.length}}</span>人
                  <p class='avatar-list'>
                    <img v-for="user in voteInfo" class="user-avatar" :src="user.avatar">
                  </p>
                </div>
              </span>
            </cell>
            <cell :border-intent="false" v-if="hasText">
              <span slot="after-title">
                <div v-html="detail.text"></div>
              </span>
            </cell>
          </div>
        </mt-loadmore>
      </div>
    </transition>
    <transition name="page2">
      <div v-show="isQuestionaireShown" class='page2 full-page-box'>
        <mt-loadmore
         :top-method="loadTop"
         topPullText="下拉回到上一页"
         topDropText="释放回到上一页"
         topLoadingText=""
         ref="loadmore2"
        >
          <div style="min-height: 100vh">
            <cell :border-intent="false" v-if="hasText">
              <span slot="after-title">
                <div v-html="detail.text"></div>
              </span>
            </cell>
            <div class="questionaire">
              <questionaire-checklist :questionaire="questionaire" ref="questionaire-checklist"></questionaire-checklist>
            </div>
          </div>
        </mt-loadmore>
        <x-button type="primary" @click.native="submit">确认提交</x-button>
      </div>
    </transition>
  </div>
</template>
<script>
import { XImg, Grid, GridItem, Tab, TabItem, Cell, Group, XButton} from 'vux'
import { Loadmore } from 'mint-ui';
import { getArticle, getArticleVoteInfo, getVoteInfo } from '@/assets/js/ajax.js'
import questionaireChecklist from '@/components/questionaireChecklist.vue'
import $ from 'jquery'
export default {
  name: 'questionaireDetail',
  components: {
    XImg, Grid, GridItem, Tab, TabItem, Cell, Group, XButton,
    questionaireChecklist,
    mtLoadmore: Loadmore
  },
  data() {
    return {
      articleId: 0,
      text: '',
      detail: {},
      voteInfo: [],
      questionaire: {},
      answer: [],
      isQuestionaireShown: false,
      bottomDistance: 150,
      hasText: false,
    }
  },
  methods: {
    refresh(){
      const articleId = this.$data.articleId;
      //获取问卷介绍
      getArticle(articleId).then((data) => {
        this.$data.detail = data[0];
        this.$data.hasText = !!data[0].text;
      });
      //获取报名用户信息
      getArticleVoteInfo(articleId).then((data) => {
        if(data.state == 0){
          this.$data.voteInfo = data.order.read;
        }
      });
      //获取问卷
      getVoteInfo(articleId).then((data) => {
        if(data.state == 0){
          var temp = [];
          this.$data.questionaire = data.order[0];
        }
      });
    },
    loadBottom(){
      this.$data.isQuestionaireShown=true;
      this.$refs.loadmore.onBottomLoaded();
      setTimeout(function(){ //滚动条位置temp fix
        document.body.scrollTop="0";
      },200)
    },
    loadTop(){
      this.$data.isQuestionaireShown=false;
      this.$refs.loadmore2.onTopLoaded();
    },
    submit(){
      this.$refs['questionaire-checklist'].submit();
    }
  },
  created() {
    this.$data.articleId = this.$root.getQueryData().id;
  },
  mounted() {
    this.refresh();
  }
}
</script>
<style lang='less' scoped>
.top-pic{
  display: block;
  width: 100%;
  height:260px;
  background-color: white;
}
.weui-cell{
  background-color: white;
}
.questionaire-title:before{
  border-top:0!important;
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
.release-date label{
/*  font-size: 14px;
  color: #999;*/
}
.avatar-list{
  white-space:nowrap;
  overflow:hidden;
}
.user-info,.user-hint{
  background-color: white;
}
.user-info>span{
    font-size: 15px;
    color: #333;
}
.vote-count{
  color:#0088ff!important;
}
.release-date{
  font-size: 14px;
  color: #999;
}
.weui-icon-checked{
    display: block;
    width:200px;
    height:200px;
}
.weui-icon-checked ::before{
  color:red;
}
.weui-cells__title{
  background-color: white;
  font-size:20px;
}
#questionaireDetail,#questionaire{
      /*  Safari,Chrome*/
    -webkit-transition-property: all;
    -webkit-transition-duration: 10s;
    -webkit-transition-timing-function: cubic-bezier(0,0,0.5,1);
    /*  Firefox*/
    -moz-transition-property: all;
    -moz-transition-duration: 3.5s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    /*  Opera*/
    -o-transition-property: all;
    -o-transition-duration: .5s;
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    /*  IE9*/
    -ms-transition-property: all;
    -ms-transition-duration: .5s;
    -ms-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.questionaire{
  margin-top: 11px;
  margin-bottom: 44px;
  padding-bottom: 10px;
  background-color: white;
}
.weui-btn{
  background-color: rgb(0,132,255)!important;
  border-radius:0!important;
  position:fixed;
  z-index:100;
  bottom:0;
  left:0;
}
.page1,.page2{
  position: absolute;
  transition: all 500ms cubic-bezier(0,0,0.5,1);
}
.page1-enter-active{
  transform: translate(0, 0);
}
.page1-enter{
  transform: translate(0, -667px);
}
.page1-leave-active{
  transform: translate(0, -667px);
}
.page1-leave{
  transform: translate(0, 0);
}


.page2-enter-active {
  transform: translate(0, 0);
}
.page2-enter{
  transform: translate(0, 667px);
}

.page2-leave-active {
  transform: translate(0, 667px);
}
.page2-leave{
  transform: translate(0, 0);
}
</style>







