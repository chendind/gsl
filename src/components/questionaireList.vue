<template>
  <div>
    <flexbox class="questionaire-sheet" orient="vertical" v-for="questionaire in questionaires">
      <flexbox-item>
        {{questionaire.title}}
      </flexbox-item>
      <flexbox-item>
        <flexbox>
          <flexbox-item>
            <span>
              <img src="http://portal.xiyoukeji.com/webTest/source/img/user.png" class="little-icon">
              9人参与
            </span>
          </flexbox-item>
          <flexbox-item class="release-date">
            <span>
              <img src="http://portal.xiyoukeji.com/webTest/source/img/time.png" class="little-icon">
              2017-04-28
            </span>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item class="bottom-tips">
        <span>发起单位:{{questionaire.author}}</span>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
import { getPortalArticle } from '@/assets/js/ajax.js'
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
  methods: {

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









