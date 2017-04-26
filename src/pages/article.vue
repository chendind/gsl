<!-- 文章、新闻的详情页 -->
<template>
  <div>
    <div class="scrollBox bg-white">
      <div class="pd15">
        <div class="article-content">
          <div class="title">
            {{title}}
          </div>
          <div class="meta size14 color-grey mv10">
            <span class="color-indigo-blue">{{theme}}</span>
            <span class="mh3">{{author}}</span>
            <span class="mh3">{{in_time | time1}}</span>
            <span class="mh5">阅读数：{{read_count}}</span>
          </div>
        </div>
        <div class="paragraph" v-html="text"></div>
      </div>
    </div>
    <grid class="grid bottom-operator bg-white no-before no-after" :rows="2">
      <grid-item class="grid-item grid-item3 no-before no-after" @on-item-click="toggleDianzan()">
        <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/zan_grey.png')" v-show="!article_like">
        <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/zan_blue.png')" v-show="article_like">
        <span slot="label" class="grid-item-label size12 color-light-grey">点赞 {{like_count}}</span>
      </grid-item>
      <grid-item class="grid-item grid-item3 no-before no-after" @on-item-click="toggleShoucang()">
        <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/star_grey.png')" v-show="!ismeasure">
        <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/star_blue.png')" v-show="ismeasure">
        <span slot="label" class="grid-item-label size12 color-light-grey">收藏 {{measure_count}}</span>
      </grid-item>
    </grid>

  </div>
</template>
<script>
import { getArticle, toggleDianzan, toggleShoucang } from '@/assets/js/ajax.js'
import { Scroller, Grid, GridItem } from 'vux'
export default {
  name: '',
  components: {
    Scroller, Grid, GridItem
  },
  methods: {
    toggleDianzan(){
      toggleDianzan(this.$data.article_id, 1 - this.$data.article_like).done((data) => {
        if(data.state == 0) {
          this.$data.like_count = data.order.like_count;
          this.$data.article_like = 1 - this.$data.article_like;
        }
      });
    },
    toggleShoucang(){
      toggleShoucang(this.$data.article_id).done((data) => {
        if(data.state == 0) {
          this.$data.measure_count = data.order;
          this.$data.ismeasure = 1 - this.$data.ismeasure;
        }
      })
    }
  },
  data() {
    return {
      article_id: 0,
      article_like: 0,
      ismeasure: 0,
      like_count: 0,
      author: '',
      in_time: 0,
      read_count: 0,
      measure_count: 0,
      text: '',
      theme: '',
      title: ''
    }
  },
  mounted() {
    const params = this.$root.getQueryData();
    this.$data.article_id = params.id;
    getArticle(this.$data.article_id).done((data) => {
      this.$data.article_like = data[0].article_like || 0;
      this.$data.author = data[0].author;
      this.$data.in_time = data[0].in_time;
      this.$data.like_count = data[0].like_count;
      this.$data.read_count = data[0].read_count;
      this.$data.measure_count = data[0].measure_count;
      this.$data.text = data[0].text;
      this.$data.theme = data[0].theme;
      this.$data.title = data[0].title;
    })
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>
.scrollBox{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
}
.article-content{
  .title{
    color: #1a1a1a;
    font-size: 24px;
  }
}
.bottom-operator{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
}
.grid{
  padding: 10px 0 5px;
  background-color: #fff;
}
.grid-item{
  padding: 2px 10px !important;
}
</style>
<style lang='less'>
.grid-item3 .weui-grid__icon{
  width: 20px;
  height: 20px;
}
.paragraph{
  p{
    color: #2a2a2a!important;
    font-size: 16px!important;
    font-family: 'Lantinghei SC', 'Microsoft Yahei' !important;
    margin: 0!important;
    line-height: 32px!important;
    padding-bottom: 5px!important;
    background-color: #ffffff;
    text-indent: 0!important;
    white-space: normal!important;
  }
  span{
    font-family: 'Lantinghei SC', 'Microsoft Yahei' !important;
    font-size: 16px!important;
    line-height: 32px!important;
  }
}
</style>
