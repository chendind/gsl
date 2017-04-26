<template>
  <div class="articleList">
    <div class="weui-panel__bd article bg-white" v-for="(article, $articleIndex) in articles" :key="$articleIndex" @click="goArticle(article.id)">
      <div class="weui-media-box three-img-box" v-if="article.function == 1">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title ellipsis">{{article.title}}</h4>
        </div>
        <flexbox justify="space-between" align="stretch">
          <flexbox-item class="imgbox" :key="0">
            <img :src="article.photo">
          </flexbox-item>
          <flexbox-item class="imgbox" :key="1">
            <img :src="article.photo2">
          </flexbox-item>
          <flexbox-item class="imgbox" :key="2">
            <img :src="article.photo2">
          </flexbox-item>
        </flexbox>
        <div class="weui-media-box__bottom color-light-grey">
          <span>{{article.theme}}</span>
          <span class="mh10">{{article.in_time | time}}</span>
          <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" v-show="showDateoutLabel && article.end_time*1000 < (new Date() - 0)">
        </div>
      </div>
      <div class="weui-media-box single-img-box" v-if="article.function == 2">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title mutilEllipsis-2">{{article.title}}</h4>
        </div>
        <div class="imgbox">
          <img :src="article.photo_photo">
        </div>
        <div class="weui-media-box__bottom color-light-grey">
          <span>{{article.theme}}</span>
          <span class="mh10">{{article.in_time | time}}</span>
          <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" v-show="showDateoutLabel && article.end_time*1000 < (new Date() - 0)">
        </div>
      </div>
      <div class="weui-media-box weui-media-box_appmsg" v-if="article.function == 3">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title mutilEllipsis-2">{{article.title}}</h4>
        </div>
        <div class="weui-media-box__hd" v-if="article.function == 3">
          <img :src="article.photo" class="weui-media-box__thumb">
        </div>
        <div class="weui-media-box__bottom color-light-grey">
          <span>{{article.theme}}</span>
          <span class="mh10">{{article.in_time | time}}</span>
          <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" v-show="showDateoutLabel && article.end_time*1000 < (new Date() - 0)">
        </div>
      </div>
      <div class="weui-media-box single-img-box" v-if="article.function == 4">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title mutilEllipsis-2"><i class="fa fa-fw fa-video-camera"></i>{{article.title}}</h4>
        </div>
        <div class="imgbox">
          <img :src="article.photo">
        </div>
        <div class="weui-media-box__bottom color-light-grey">
          <span>{{article.theme}}</span>
          <span class="mh10">{{article.in_time | time}}</span>
          <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" v-show="showDateoutLabel && article.end_time*1000 < (new Date() - 0)">
        </div>
      </div>
      <div class="weui-media-box single-img-box" v-if="article.function == 5">
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title mutilEllipsis-2">{{article.title}}</h4>
        </div>
        <div class="weui-media-box__bottom color-light-grey">
          <span>{{article.theme}}</span>
          <span class="mh10">{{article.in_time | time}}</span>
          <img class="guoqi mv10" :src="require('@/assets/image/dateout.png')" v-show="showDateoutLabel && article.end_time*1000 < (new Date() - 0)">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
export default {
  name: 'articleList',
  components: {
    Flexbox, FlexboxItem
  },
  props: {
    articles: {
      type: Array,
      default: [],
      required: false,
    },
    showDateoutLabel: {
      type: Boolean,
      defalut: true,
      required: false,
    }
  },
  methods: {
    goArticle(id){
      debugger;
      const url = this.$root.encodeObj({
        id
      });
      this.$root.openMobileWindow(`article?${url}`);
    }
  }
}
</script>
<style lang='less'>

</style>











