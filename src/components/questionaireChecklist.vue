<template>
  <div>
    <div v-for="question in questionaire">
      <span>多选 {{question.text}}</span>
      <checklist :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change">
      </checklist>
    </div>
  </div>
</template>
<script>
import { Checklist } from 'vux'
export default {
  name: 'questionaireChecklist',
  components: {
    Checklist
  },
  props: {
    questionaire: {
      type: Array,
      default: [],
      required: false,
    },
  },
  data() {
    return{
      labelPosition: '',
      error: '',
      commonList: [ 'A.在线预览', 'B.批量上传', 'C.在线编辑', 'D.文件分类' ],
      // checklist001: [],
      // checklist0011: [],
      // checklist002: [ 'China', 'Japan' ],
      // checklist003: [ 'China', 'Japan' ],
      // checklist005: [ '01', '02', '03' ],
      // checklist005Value: [],
      // objectList: [{key: '1', value: '001 value'}, {key: '2', value: '002 value'}, {key: '3', value: '003 value'}],
      // objectListValue: ['1', '2'],
      // asyncList: [],
      // asyncListValue: []
    }
  },
  methods: {
  }
}
</script>
<style lang='less'>
 
</style>









