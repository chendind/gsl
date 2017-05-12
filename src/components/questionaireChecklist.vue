<template>
  <div>
    <div v-for="(question,$index) in questionaire.children" :key="$index">
      <span class="label-bar"><span class="choices">{{question.is_single_choice?"单选":"多选"}}</span> {{question.text}}</span>
      <div class="checklist-wrap">
        <div class="checklist">
          <div class="weui-cells weui-cells_checkbox no-after no-before">
            <label class="weui-cell weui-check_label" :for="`${question.question_id}-${child.id}`" v-for="(child, $index2) in question.children" :key="$index2">
              <div class="weui-cell__hd">
                <!-- <input :type="question.is_single_choice?'radio':'checkbox'" class="weui-check" :name="`${question.question_id}`" :id="`${question.question_id}-${child.id}`" v-model="child.isselect"> -->
                <input type="radio" v-if="question.is_single_choice" class="weui-check" :name="`${question.question_id}`" :id="`${question.question_id}-${child.id}`" :checked="child.isselect" @change="onChange($event, $index, $index2)">
                <input type="checkbox" v-if="!question.is_single_choice" class="weui-check" :name="`${question.question_id}`" :id="`${question.question_id}-${child.id}`" :checked="child.isselect" @change="onChange($event, $index, $index2)">
                <i class="weui-icon-checked vux-checklist-icon-checked"></i>
              </div>
              <div class="weui-cell__bd">
                {{child.text}}
              </div>
            </label>
          </div>
        </div>
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
      type: Object,
      default: {},
      required: false,
    },
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
    onChange(event, index, index2){
      const checked = event.target.checked;
      const question = this.questionaire.children[index];
      if (question.is_single_choice) {
        for(let _index in question.children){
          if (_index == index2) {
            question.children[_index].isselect = true;
          } else {
            question.children[_index].isselect = false;
          }
        }
      } else {
        question.children[index2].isselect = !!checked;
      }
    },
    getAnswers(){
      const answers = this.questionaire.children.map((item) => {
        const choice_id = [];
        item.children.forEach((child) => {
          if(child.isselect){
            choice_id.push(child.id);
          }
        });
        return {
          question_id: item.question_id - 0,
          choice_id,
        }
      });
      return answers;
    },
  },
  watch: {
    submit: function() {
      // 将选项转译回choiceid
      // if(this.submit){
      //   let answers = [];
      //   let checklist = this.$data.checklist;
      //   let questionaire = this.questionaire;
      //   for(let question_id in checklist){
      //     let rawAnswerArray = checklist[question_id];
      //     let answer = {};
      //     answer.question_id = parseInt(question_id);
      //     answer.choice_id = [];
      //     // 遍历questionaire数组
      //     questionaire.forEach(question => {
      //       if(question.question_id == question_id){
      //         let options = question.children;
      //         options.forEach(option => {
      //           rawAnswerArray.forEach(rawAnswer => {
      //             if(rawAnswer.slice(3) == option.text){
      //               answer.choice_id.push(option.id);
      //             }
      //           })
      //         })
      //       }
      //     })
      //     answers.push(answer);
      //   }
      //   const questionaireId = localStorage.getItem('questionaireId');
      //   pushAnswers(questionaireId,answers).then(msg => {
      //     console.log(msg)
      //   })
      // }
    }
  },
}
</script>
<style lang='less' scoped>
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
    .weui-cells{
      margin-top: 0;
    }
  }
</style>









