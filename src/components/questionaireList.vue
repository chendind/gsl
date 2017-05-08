<template>
  <div>
    <div v-for="(article,$index) in articleList" :key="$index" @click="goDetail(article)">
      <flexbox class="article-sheet" orient="vertical">
        <flexbox-item>
          {{article.title}}
        </flexbox-item>
        <flexbox-item>
          <flexbox>
            <flexbox-item>
              <span>
                <img src="http://portal.xiyoukeji.com/webTest/source/img/user.png" class="little-icon">
                {{article.voteCount}}人参与
              </span>
            </flexbox-item>
            <flexbox-item class="release-date">
              <span>
                <img src="http://portal.xiyoukeji.com/webTest/source/img/time.png" class="little-icon">
                  {{article.in_time | time2}}
              </span>
            </flexbox-item>
          </flexbox>
        </flexbox-item>
        <flexbox-item class="bottom-tips">
          <span>发起单位:{{article.author}}</span>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
export default {
  name: 'questionaireList',
  components: {
    Flexbox, FlexboxItem
  },
  props: {
    articleList: {
      type: Array,
      default: [],
      required: false,
    }
  },
  methods: {
    goDetail(article){
      const query = this.$root.encodeObj({id: article.id})
      this.$root.openMobileWindow(`questionaireDetail?${query}`)
    }
  }
}
</script>
<style lang='less'>
  .article-sheet{
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









