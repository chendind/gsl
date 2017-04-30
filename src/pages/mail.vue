<!-- 提案 -->
<template>
  <div>
    <div class="full-page-box bg-white">
      <div class="pd15" style="font-size: 16px;padding-bottom: 0;color: #666;">我的{{type}}标题是：</div>
      <input class="title pd15" type="text" placeholder="请输入标题" v-model="title">
      <textarea class="content pd15" placeholder="请输入内容" v-model="text"></textarea>
      <x-button class="weui-btn_blue button" @click.native="submit">提交</x-button>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'
import { question } from '@/assets/js/ajax.js'
export default {
  name: 'mail',
  components: {
    XButton
  },
  data(){
    return {
      type: '',
      title: '',
      text: '',
    }
  },
  methods: {
    submit(){
      const title = this.$data.title;
      const text = this.$data.text;
      const type = this.$data.type;
      const portal_id = localStorage.getItem('portalId');
      if (!title) {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入标题'
        });
        return ;
      }
      if (!text) {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入内容'
        });
        return ;
      }
      question(portal_id, type, title, text).done((data) => {
        if (data.state == 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '提交成功！'
          });
        }
      })
    }
  },
  mounted() {
    this.$data.type = this.$root.getQueryData().type;
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>
.title{
  display: block;
  width: 100%;
  border: none;
  margin: 0;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  height: auto;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.content {
  display: block;
  width: 100%;
  border: none;
  margin: 0;
  font-size: 14px;
  min-height: 450px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
  resize: none;
}
.button{
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
