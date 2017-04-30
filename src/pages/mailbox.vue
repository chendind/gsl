<!-- 主席信箱 -->
<template>
  <div>
    <group class="group" gutter="0">
      <cell title="提案" is-link @click.native="$root.openMobileWindow('mail?'+$root.encodeObj({type: '提案'}), '我的提案')">
        <img class="cell-left-icon icon-md" slot="icon" :src="require('@/assets/image/ta.png')">
      </cell>
      <cell title="建议" is-link @click.native="$root.openMobileWindow('mail?'+$root.encodeObj({type: '建议'}), '我的建议')">
        <img class="cell-left-icon icon-md" slot="icon" :src="require('@/assets/image/jy.png')">
      </cell>
      <cell title="问题" is-link @click.native="$root.openMobileWindow('mail?'+$root.encodeObj({type: '问题'}), '我的问题')">
        <img class="cell-left-icon icon-md" slot="icon" :src="require('@/assets/image/wt.png')">
      </cell>
    </group>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
export default {
  name: 'mailbox',
  components: {
    Group, Cell
  },
  methods: {
  },
  mounted() {
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>
.cell-left-icon{
  margin-right: 10px;
}
</style>
