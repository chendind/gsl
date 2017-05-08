<template>
  <div class="articleListMutual">
    <div class="article bg-white" v-for="(article, $index) in articles" :key="$index" @click="goArticle(article)">
      <div class="header pd15">
        <img class="avatar" :src="article.avatar">
        <div class="name">{{article.name}}</div>
        <div class="color-grey ellipsis size14">{{article.section}}</div>
      </div>
      <div class="content pd15" style="padding-bottom: 0;padding-top: 0;">
        <div class="title ellipsis">
          {{article.title}}
        </div>
        <div class="text mutilEllipsis-3">{{article.text}}</div>
      </div>
      <div class="footer pd15 size14">
        <span class="color-light-grey">{{article.in_time | time2}}</span>
        <div class="pull-right color-blue">
          <span>
            <img :src="require('@/assets/image/zan_blue.png')" class="icon-xs">
            {{article.like_count}}
          </span>
          <span class="mh10">
            <img :src="require('@/assets/image/mes_blue.png')" class="icon-xs">
            {{article.comment_count}}
          </span>
          <span>
            <img :src="require('@/assets/image/eye_blue.png')" class="icon-xs">
            {{article.read_count}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Panel, Flexbox, FlexboxItem } from 'vux'
import { getPortalArticle } from '@/assets/js/ajax.js'
export default {
  name: 'articleListMutual',
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
      default: true,
      required: false,
    },
  },
  methods: {
    goArticle({id, link}){
      if (!link) {
        const url = this.$root.encodeObj({
          id
        });
        this.$root.openMobileWindow(`mutualAidInfo?${url}`);
      } else {
        this.$root.openMobileWindow(link);
      }
    }
  }
}
</script>
<style lang='less'>
.articleListMutual{
  .article{
    margin-bottom: 10px;
    &:last-child{
      margin-bottom: 0;
    }
    .header{
      position: relative;
      padding-left: 70px;
      .avatar{
        position: absolute;
        left: 15px;
        top: 15px;
        width: 45px;
        height: 45px;
      }
    }
    .content{
      .title{
        font-size: 18px;
        color: #000;
        font-weight: 600;
      }
    }
  }
}
</style>











