<!-- 回执填写 -->
<template>
  <div>
    <group :title="article.receipt_title">
      <x-input :title="item.name" novalidate v-for="(item, $index) in receipt" :key="$index" placeholder="请输入内容..." v-model="item.value" :show-clear="false"></x-input>
    </group>
    <div class="pd10">
      <x-button
        class="weui-btn_grey"
        action-type="button"
        v-if="userType === 'tourist'"
      >游客无法提交回执</x-button>
      <x-button
        class="weui-btn_blue"
        action-type="button"
        v-else
        @click.native="submit"
      >提交</x-button>
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton } from 'vux'
import { getArticle, sendReceipt } from '@/assets/js/ajax.js'
export default {
  name: 'receipt',
  components: {
    Group, XInput, XButton
  },
  data() {
    return {
      articleId: 0,
      article: {},
      receipt: [],
      userType: localStorage.getItem('userType'),
    }
  },
  methods: {
    getArticle(){
      const articleId = this.$data.articleId;
      getArticle(articleId).then((data) => {
        this.$data.article = data[0];
        this.$data.receipt = data[0].receipt.map((item) => {
          return {
            ...item,
            value: '',
          }
        })
      });
    },
    submit(){
      const articleId = this.$data.articleId;
      const answer = this.$data.receipt;
      sendReceipt(articleId, answer).then((data) => {
        if (data.state == 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '提交成功',
            onShow () {},
            onHide () {}
          });
        }
        else if (data.state == 10003) {
          this.$vux.alert.show({
            title: '提示',
            content: '回执已过期',
            onShow () {},
            onHide () {}
          });
        }
      })
    }
  },
  created() {
    this.$data.articleId = this.$root.getQueryData().id;
  },
  mounted() {
    this.getArticle();
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>
</style>
