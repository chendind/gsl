<!-- 新增生活互助文章 -->
<template>
  <div>
    <div class="full-page-box bg-white">
      <input class="title pd15" type="text" placeholder="请输入标题" v-model="title">
      <textarea class="content pd15" placeholder="请输入内容" v-model="text"></textarea>
      <div class="upload-box pd15 after">
        <div class="image" v-for="image in uploadedImages">
          <img :src="image">
        </div>
        <div class="upload-button color-grey text-center" @click="pickPhoto">
          <img :src="require('@/assets/image/plus_.png')">
          <div style="margin-top: 3px;">添加图片</div>
        </div>
      </div>
      <x-button class="weui-btn_blue button no-border-radius" @click.native="submit">提交</x-button>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'
import { mutualPublish } from '@/assets/js/ajax.js'
export default {
  name: 'addingAidInfo',
  components: {
    XButton
  },
  data() {
    return {
      uploadedImages: [],
      photo_ids: [],
      title: '',
      text: '',
    }
  },
  methods: {
    pickPhoto(){
      if (!this.$root.isApp) {
        this.$vux.alert.show({
          title: '提示',
          content: '请在APP端上传图片',
        });
        return ;
      }
      let number = 0;
      this.uploadPhoto().then((photo_ids) => {
        this.$data.photo_ids = photo_ids;
        const promiseList = [];
        photo_ids.forEach((photo_id) => {
          promiseList.push(this.getCloudFileUrl(photo_id));
        });
        Promise.all(promiseList).then((data) => {
          const uploadedImages = data.map((item) => {
            return item.result;
          });
          this.$data.uploadedImages = [
            ...this.$data.uploadedImages,
            ...uploadedImages,
          ];
        })
      })
    },
    uploadPhoto(){
      return new Promise((resolve, reject) => {
        Bridge.uploadPhoto (9, (result) => {
          if (result.result != 1) return;
          const photo_ids = result.images.map((item) => {
            return item.image
          });
          resolve(photo_ids)
        });
      });
    },
    getCloudFileUrl(photo_id){
      return new Promise((resolve) => {
        Bridge.getCloudFileUrl(photo_id,null,function(s){
          resolve(s);
        });
      })
    },
    submit(){
      const portalId = localStorage.getItem('portalId');
      const title = this.$data.title;
      const text = this.$data.text;
      const photo = this.$data.photo_ids;
      if (title === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入标题',
        });
      } else if (text === ''){
        this.$vux.alert.show({
          title: '提示',
          content: '请输入内容',
        });
      } else {
        mutualPublish(portalId, title, text, photo).then((data) => {
          if (data.state == 0) {
            this.$vux.alert.show({
              title: '提示',
              content: '提交成功',
              onShow () {},
              onHide () {
                Bridge.closeMobileWindow("1");
              }
            });
          } else {

          }
        })
      }
    }
  },
  mounted() {
    this.$vux.alert.show({
      title: '温馨提示',
      content: '请遵循诚信、互助的原则发布内容，严禁发布违反国家相关规定的内容',
      onShow () {},
      onHide () {}
    });
    Bridge.customGoBack(()=>{
      Bridge.closeMobileWindow("1");
    },'');
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
  line-height: 1;
}
.content {
  display: block;
  width: 100%;
  border: none;
  margin: 0;
  font-size: 14px;
  min-height: 200px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
  resize: none;
}
.button{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
}
.upload-box{
  .image{
    width: 75px;
    height: 75px;
    float: left;
    margin-right: 5px;
    &>img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .upload-button{
    width: 75px;
    height: 75px;
    float: left;
    font-size: 12px;
    &>img{
      display: block;
      width: 100%;
    }
  }
}
</style>
