<!-- 问卷详情 -->
<template>
  <div>
    <transition name="page1">
      <div v-show="!isQuestionaireShown" class="page1 full-page-box">
        <mt-loadmore
          :top-method="refresh"
          :bottom-method="loadBottom"
          :bottomDistance="bottomDistance"
          ref="loadmore"
        >
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
            <span slot="after-title" @click="$root.openMobileWindow('joinerList')">
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
        </mt-loadmore>
      </div>
    </transition>
    <transition name="page2">
      <div v-show="isQuestionaireShown" class='page2 full-page-box'>
        <mt-loadmore
         :top-method="loadTop"
         ref="loadmore2"
        >
          <cell :border-intent="false">
            <span slot="after-title">
              <p v-for="item in detail.text">
                  {{item}}
              </p>
            </span>
          </cell>
          <div class="questionaire">
            <questionaire-checklist @completed="feedback" :questionaire="questionaire"></questionaire-checklist>
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
import { getArticle, getArticleVoteInfo, getVoteInfo, pushQuestionaire } from '@/assets/js/ajax.js'
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
      detail: [],
      voteInfo:[],
      questionaire:[],
      answer:[],
      isQuestionaireShown:false,
      bottomDistance:150,
      topPic:require('@/assets/image/top_2.png'),
      iconPic:require('@/assets/image/time_new.png'),
    }
  },
  methods: {
    refresh(){
      const questionaireId = localStorage.getItem('questionaireId');
      //获取问卷介绍
      getArticle(questionaireId).done((data) => {
        let detail = data[0];
        //去除html中多余的问卷调查按钮部分
        let hintHtml = $.parseHTML(detail.text);
        hintHtml.pop();
        detail.text = hintHtml.map(item => item.innerText)
        this.$data.detail = detail;
      });
      //获取报名用户信息
      getArticleVoteInfo(questionaireId).done((data) => {
        if(data.state == 0){
          this.$data.voteInfo = data.order.read;
        }
      });
      //获取问卷
      getVoteInfo(questionaireId).done((data) => {
        if(data.state == 0){
          var temp = [];
          const questionaire = data.order[0].children;
          for(let question of questionaire){
            let options = [];
            let children = question.children;
            children.forEach((option,key) => {
              options.push(this.convert(key)+"  "+option.text);
            })
            let ids = [];
            children.forEach((option,key) => {
              ids.push(option.id);
            })
            question.options = options;
            question.ids = ids;
            temp.push(question);
          }
          this.$data.questionaire = temp;
        }
      });
      // this.$refs.loadmore.onTopLoaded();foption
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
    // 数字转字母
    convert(num){
      num++;
      return num <= 26 ?
           String.fromCharCode(num + 64) : convert(~~((num - 1) / 26)) + convert(num % 26 || 26);
    },
    // 回传问卷答案
    feedback(answer){
      this.$data.answer = answer;
    },
    submit(){
      console.log('hehe')
      // 检测问卷是否填写完整
      let answer = this.$data.answer;
      pushQuestionaire(answer).done(msg=>{
        console.log(msg)
      })
    }
  },
  created() {
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







