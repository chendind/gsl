<template>
  <div>
    <div v-for="question in questionaire">
      <span class="label-bar"><span class="choices">{{question.is_single_choice?"单选":"多选"}}</span> {{question.text}}</span>
      <div class="checklist-wrap">
        <checklist class="checklist" :options="question.options" v-model="checklist[question.question_id]" :max="question.is_single_choice?1:0" @on-change="onChange">
        </checklist>
      </div>
    </div>
  </div>
</template>
<script>
import { Checklist } from 'vux'
import $ from 'jquery'
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
    }
  },
  data() {
    return{
      labelPosition: '',
      error: '',
      options:{},
      checklist:{},
    }
  },
  methods: {
    onChange:function (value){
      //文字跟随checkbox变色
      $(".weui-check:checked").parent().next().find("p").css({color:"#ff6735"});
      $(".weui-check:not(:checked)").parent().next().find("p").css({color:"black"});
      console.log(this.$data.checklist)
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

  .weui-cell:before{
    left:0!important;
  }


</style>









