<template>
  <div>
    <div v-for="questionaire in questionaires" @click="goArticle(questionaire.id)">
      <flexbox class="questionaire-sheet" orient="vertical">
        <flexbox-item>
          {{questionaire.title}}
        </flexbox-item>
        <flexbox-item>
          <flexbox>
            <flexbox-item>
              <span>
                <img src="http://portal.xiyoukeji.com/webTest/source/img/user.png" class="little-icon">
                {{articleVoteCount(questionaire.id)}}{{voteCount}}{{hehe}}人参与
              </span>
            </flexbox-item>
            <flexbox-item class="release-date">
              <span>
                <img src="http://portal.xiyoukeji.com/webTest/source/img/time.png" class="little-icon">
                  {{questionaire.in_time | time2}}
              </span>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item class="bottom-tips">
          <span>发起单位:{{questionaire.author}}</span>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
import { getPortalArticle, getArticleVoteCount } from '@/assets/js/ajax.js'
export default {
  name: 'questionaireList',
  components: {
    Flexbox, FlexboxItem
  },
  props: {
    questionaires: {
      type: Array,
      default: [],
      required: false,
    }
  },
  data(){
    return {
      voteCount:{},
      hehe:'hehe'
    }
  },
  methods: {
    goArticle(id){
      const url = this.$root.encodeObj({
        id
      });
      this.$root.openMobileWindow(`article?${url}`);
    },
    // articleVoteCount(id){
    //   getArticleVoteCount(id).done(data=>{
    //     this.voteCount[id]=data.order.count;
    //     console.log(this.$data)
    //   });
    // }
  },
  mounted(){
    console.log(this.questionaires)
  }
}
</script>
<style lang='less'>
  .questionaire-sheet{
    background-color: white;
    padding:11px 15px;
    span{
      color:#aaa;
      font-size: 12px;
    }
  }
  .release-date{
    text-align: right;
    margin-right: 32px;
  }
  .little-icon {
    display: inline-block;
    width: 14px;
    vertical-align: middle;
    margin-bottom: 4px;
    margin-right: -1px;
  }
  .bottom-tips>span{
    color: #999;
    font-size: 13px;
  }
</style>









