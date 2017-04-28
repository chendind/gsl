<template>
  <div>
    <div v-for="question in questionaire">
      <span class="label-bar"><span class="choices">多选</span> {{question.text}}</span>
      <div class="checklist-wrap">
        <checklist class="checklist" :options="question.options" @on-change="onChange">
        </checklist>
      </div>
    </div>
    <x-button type="primary">确认提交</x-button>
  </div>
</template>
<script>
import { Checklist, XButton } from 'vux'
import $ from 'jquery'
export default {
  name: 'questionaireChecklist',
  components: {
    Checklist, XButton
  },
  props: {
    questionaire: {
      type: Array,
      default: [],
      required: false,
    }
  },
  data() {
    return{
      labelPosition: '',
      error: '',
      commonList: [ 'A.在线预览', 'B.批量上传', 'C.在线编辑', 'D.文件分类' ],
      options:{}
    }
  },
  methods: {
    onChange:function (value){
      //文字跟随checkbox变色
      $(".weui-check:checked").parent().next().find("p").css({color:"#ff6735"});
      $(".weui-check:not(:checked)").parent().next().find("p").css({color:"black"});
    }
  }
}
</script>
<style lang='less'>
  .weui-check:checked + .vux-checklist-icon-checked:before {
    color:rgb(255,103,53)!important;
  }

  .label-bar{
    display: block;
    background-color: white;
    padding: 13px 15px 5px 15px;
  }
  
  .choices{
    color:rgb(0,132,255);
    display: inline-block;
    margin-right:5px;
  }

  .checklist-wrap{
    background-color: white;
  }

  .checklist{
    margin: 0 15px 0 15px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 2px 0 2px 0;

  }

  .checklist .weui-cells:before {
    border-top:0!important;
  }

  .checklist .weui-cells:after {
    border-bottom:0!important;
  }

  .weui-btn{
    background-color: rgb(0,132,255)!important;
    border-radius:0!important;
  }
</style>









