<!-- 问卷详情 -->
<template>
  <div>
    <scroller
      :use-pulldown="true"
      height="100vh"
      :pulldown-config="pulldownConfig"
      :lock-x="true"
      ref="scroller"
      @on-pulldown-loading="onPulldownLoading"
      @on-scroll="onScroll"
    > 
      <div v-if="isQuestionaireShown">
        <cell :border-intent="false">
          <span slot="after-title">
            <p v-for="item in detail.text">
                {{item}}
            </p>
          </span>
        </cell>
        <div>
          <questionaire-checklist :questionaire="questionaire"></questionaire-checklist>
        </div>
      </div>
      <div v-else> 
        <x-img class="top-pic" :src="topPic"></x-img>
          <cell class="questionaire-title" :title="detail.title" :border-intent="false">
          </cell>
          <cell :border-intent="false">
            <span slot="after-title">
              <img src="iconPic">
              <span class="release-date">
                {{detail.in_time | time1}}
              </span>
            </span>
          </cell>
          <cell :border-intent="false">
            <span slot="after-title">
              <div class="user-info">
                已报名<span class="vote-count">{{voteInfo.length}}</span>人
                <p class='avatar-list'>
                  <img v-for="user in voteInfo" class="user-avatar" :src="user.avatar">
                </p>
              </div>
            </span>
          </cell>
          <cell :border-intent="false">
            <span slot="after-title">
              <p v-for="item in detail.text">
                  {{item}}
              </p>
            </span>
          </cell>
      </div>
    </scroller>
  </div>
</template>
<script>
import { Scroller, XImg, Grid, GridItem, Tab, TabItem, Cell, Group} from 'vux'
import { getArticle, getArticleVoteInfo, getVoteInfo } from '@/assets/js/ajax.js'
import questionaireChecklist from '@/components/questionaireChecklist.vue'
import $ from 'jquery'
export default {
  name: 'education',
  components: {
    Scroller, XImg, Grid, GridItem, Tab, TabItem, Cell, Group ,
    questionaireChecklist
  },
  data() {
    return {
      detail: [],
      voteInfo:[],
      questionaire:[],
      isQuestionaireShown:false,
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
        // content: 'Pull Up To Load',
        pullUpHeight: 2000,
        // height: 40,
        autoRefresh: false,
        // downContent: '上拉加载问卷',
        // upContent: '释放开始加载',
        loadingContent: '<i class="fa fa-fw fa-spinner fa-spin"></i>正在加载...',
        clsPrefix: 'xs-plugin-pullup-'
      },
      topPic:require('@/assets/image/top_2.png'),
      iconPic:require('@/assets/image/time_new.png'),

    }
  },
  methods: {
    onPulldownLoading(){
      const questionaireId = localStorage.getItem('questionaireId');
      getArticle(questionaireId).done((data) => {
        let detail = data[0];
        //去除html中多余的问卷调查按钮部分
        let hintHtml = $.parseHTML(detail.text);
        hintHtml.pop();
        detail.text = hintHtml.map(item => item.innerText)
        this.$data.detail = detail;
        this.$refs.scroller.donePulldown();
        this.$refs.scroller.enablePullup();
      });
      getArticleVoteInfo(questionaireId).done((data) => {
        if(data.state == 0){
          this.$data.voteInfo = data.order.read;
          this.$refs.scroller.donePulldown();
          this.$refs.scroller.enablePullup();
        }
      });
    },
    onPullupLoading(){
      const questionaireId = localStorage.getItem('questionaireId');
      getVoteInfo(questionaireId).done((data) => {
        if(data.state == 0){
          this.$data.questionaire = data.order.children;
          this.$data.isQuestionaireShown=true;
          this.$refs.scroller.donePulldown();
          this.$refs.scroller.enablePullup();
        }
      })
    },
    onScroll (pos) {
      if(pos.top>150){
        const questionaireId = localStorage.getItem('questionaireId');
        getVoteInfo(questionaireId).done((data) => {
          console.log(questionaireId,data)
          if(data.state == 0){
            this.$data.questionaire = data.order[0].children;
            console.log(this.$data.questionaire )
            this.$data.isQuestionaireShown=true;
            this.$refs.scroller.donePulldown();
            this.$refs.scroller.enablePullup();
          }
        })
      }
      this.scrollTop = pos.top
    }
  },
  mounted() {
    this.onPulldownLoading();
  },
  updated() {
    this.$refs.scroller.reset();
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

.weui-cells__title{
  background-color: white;
  font-size:20px;
}
</style>