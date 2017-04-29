<!-- 内容推荐 -->
<template>
  <div>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <selector title="推荐分类" :options="['专家', '课程', '其他']" v-model="category"></selector>
      <x-textarea class="vux-x-textarea" title="推荐内容" placeholder="请输入内容" :show-counter="false" :rows="5" v-model="text"></x-textarea>
    </group>
    <div class="pd10">
      <x-button
        class="weui-btn_blue"
        action-type="button"
        @click.native="recommend"
      >提交</x-button>
    </div>
  </div>
</template>
<script>
import { Group, Selector, XTextarea, XButton } from 'vux'
import { recommend } from '@/assets/js/ajax.js'
export default {
  name: 'prosume',
  components: {
    Group, Selector, XTextarea, XButton
  },
  data(){
    return {
      category: '专家',
      text: '',
    }
  },
  methods: {
    recommend(){
      if (!this.$data.text) {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入推荐内容'
        });
        return ;
      }
      recommend(this.$root.getQueryData().id, this.$data.category, this.$data.text).done((data) => {
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

  },
  updated() {
  }
}
</script>
<style lang='less' scoped>

</style>
