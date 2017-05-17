<!-- 文章、新闻的详情页 -->
<!-- 普通的文章页 -->
<template>
  <div>
    <div v-if="fn === 3 || fn === 1">
      <div class="scroll-box full-page-box bg-white" style="bottom: 60px;">
        <div class="pd15">
          <div class="article-content">
            <div class="title">
              {{title}}
            </div>
            <div class="meta size14 color-grey mv10">
              <span class="color-indigo-blue">{{theme}}</span>
              <span class="mh3">{{author}}</span>
              <span class="mh3">{{in_time | time1}}</span>
              <span class="mh5">阅读数：{{read_count}}</span>
            </div>
          </div>
          <div class="paragraph" v-html="text" style="overflow-x: hidden;"></div>
          <div>
            <div v-for="file in files">
              附件<a class="file-link" @click="openFileLink(file)">{{file.name}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="fn === 2" class="full-page-box bg-black color-white" style="z-index: 0;">
      <previewer :list="photo_photo" ref="previewer1" :options="previewerOption1"></previewer>
      <!-- <swiper :show-dots="false" height="100vh">
        <swiper-item class="swiper-item-box" v-for="(photo, $index) in photo_photo" :key="$index">
          <div class="text-center pd15">{{$index+1}}/{{photo_photo.length}}</div>
          <div class="image-box">
            <img :src="photo.photo">
          </div>
          <div class="bottom-text-box pd10">{{photo.text}}</div>
        </swiper-item>
      </swiper> -->
      <!-- <mt-swipe :show-indicators="false" :auto="0">
        <mt-swipe-item class="swiper-item-box" v-for="(photo, $index) in photo_photo" :key="$index">
          <div class="text-center pd15">{{$index+1}}/{{photo_photo.length}}</div>
          <div class="image-box">
            <img :src="photo.photo">
          </div>
          <div class="bottom-text-box pd10">{{photo.text}}</div>
        </mt-swipe-item>
      </mt-swipe> -->
    </div>
    <div v-if="fn === 4">
      <div class="iframe-box" v-html="iframe"></div>
      <div class="pd15 bg-white">{{title}}</div>
    </div>
    <div v-if="fn !== 2">
      <grid class="grid theme-bar bottom-operator bg-white no-before no-after" :rows="2">
        <grid-item class="grid-item grid-item3 no-before no-after" @on-item-click="toggleDianzan()">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/zan_grey.png')" v-show="!article_like">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/zan_blue.png')" v-show="article_like">
          <span slot="label" class="grid-item-label size12 color-light-grey">点赞 {{like_count}}</span>
        </grid-item>
        <grid-item class="grid-item grid-item3 no-before no-after" @on-item-click="toggleShoucang()">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/star_grey.png')" v-show="!ismeasure">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/star_blue.png')" v-show="ismeasure">
          <span slot="label" class="grid-item-label size12 color-light-grey">收藏 {{measure_count}}</span>
        </grid-item>
      </grid>
    </div>
    <div class="writing-button" style="z-index: 1;">
      <div class="round-button" style="position: relative;z-index: 1;">
        <img :src="require('@/assets/image/edit_n.png')" v-show="!isShowSubButton" @click="showSubButton">
        <img :src="require('@/assets/image/cancel.png')" v-show="isShowSubButton" @click="hideSubButton">
      </div>
      <div class="sub-button-box fade-in-effect" :class="{'show': isShowSubButton}">
        <div class="round-button" @click="$root.openMobileWindow(`advice?${$root.encodeObj({id: article_id})}`)">
          <img :src="require('@/assets/image/advice.png')">
        </div>
        <div class="round-button mv10" @click="$root.openMobileWindow(`prosume?${$root.encodeObj({id: article_id})}`)">
          <img :src="require('@/assets/image/prosume.png')">
        </div>
      </div>
    </div>
    <previewer :list="images" ref="previewer2" :options="previewerOption2"></previewer>
  </div>
</template>
<script>
import { getArticle, toggleDianzan, toggleShoucang } from '@/assets/js/ajax.js'
import { Scroller, Grid, GridItem, Previewer } from 'vux'
import $ from 'jquery'
export default {
  name: '',
  components: {
    Scroller, Grid, GridItem,
    Previewer
  },
  methods: {
    toggleDianzan(){
      toggleDianzan(this.$data.article_id, 1 - this.$data.article_like).then((data) => {
        if(data.state == 0) {
          this.$data.like_count = data.order.like_count;
          this.$data.article_like = 1 - this.$data.article_like;
        }
      });
    },
    toggleShoucang(){
      toggleShoucang(this.$data.article_id).then((data) => {
        if(data.state == 0) {
          this.$data.measure_count = data.order;
          this.$data.ismeasure = 1 - this.$data.ismeasure;
        }
      })
    },
    showSubButton(){
      this.$data.isShowSubButton = true;
    },
    hideSubButton(){
      this.$data.isShowSubButton = false;
    },
    getDownloadFile(text){
      const aDom = $('.paragraph').find('.list-paddingleft-2').find('a');
      $.each(aDom, (index, dom) => {
        this.$data.files.push({
          url: dom.href,
          name: dom.innerText
        });
      });
    },
    bindOtherLinkEvent(text){
      const aDom = $('.paragraph').find('a');
      $.each(aDom, (index, dom) => {
        $(dom).on('click', (e)=>{
          e.preventDefault();
          if (this.$root.isApp) {
            Bridge.openMobileWindow(dom.href, '');
          } else {
            window.open(dom.href)
          }
        })
      });
    },
    getAllImages(text){
      const imageDom = $('.paragraph').find('img');
      let loadedLength = 0;
      const photos = [];
      $.each(imageDom, (index, dom) => {
        photos.push({
          src: dom.src
        });
      });
      this.$root.getUploadedImages(photos).then(data => {
        this.$data.images = data;
        imageDom.addClass('preview-img').on('click', (e)=>{
          const index = imageDom.index($(e.target));
          this.$refs.previewer2.show(index);
        });
      })
    },
    imageBindEvent(index, dom){
      $(dom).addClass('preview-img').on('click', ()=>{
        this.$refs.previewer2.show(index);
      });
    },
    openFileLink(file){
      if (this.$root.isApp) {
        Bridge.showDownloadFile({"url": file.url,"name": file.name});
      } else {
        window.open(file.url)
      }
    },

  },
  data() {
    return {
      article_id: 0,
      article_like: 0,
      ismeasure: 0,
      like_count: 0,
      author: '',
      in_time: 0,
      read_count: 0,
      measure_count: 0,
      text: '',
      theme: '',
      title: '',
      isShowSubButton: false,
      fn: 0,
      photo_photo: [],
      previewerOption1: {
        closeEl: false,
        fullscreenEl: false,
        shareEl: false,
        counterEl: true,
        arrowEl: true,
        spacing: 0,
        history:false,
        galleryPIDs:false,
        loop: false,
        showHideOpacity: true,
        hideAnimationDuration:0,
        showAnimationDuration:0,
        tapToClose: false,
        pinchToClose: false,
        closeOnScroll: false,
        closeOnVerticalDrag: false,
        clickToCloseNonZoomable: false,
        // Function builds caption markup
        addCaptionHTMLFn: function(item, captionEl, isFake) {
            // item      - slide object
            // captionEl - caption DOM element
            // isFake    - true when content is added to fake caption container
            //             (used to get size of next or previous caption)
            if(!item.title) {
                captionEl.children[0].innerHTML = '';
                return false;
            }
            captionEl.children[0].innerHTML = `<div style="min-height: 20vh;background-color: rgba(0,0,0,0.5);">${item.title}</div>`;
            return true;
        },
        getThumbBoundsFn() {
          return {x: 0, y: 0, w: 0}
        }
      },
      previewerOption2: {
        fullscreenEl: false,
        shareEl: false,
        counterEl: true,
        arrowEl: true,
        spacing: 0,
        pinchToClose: true,
        history:false,
        galleryPIDs:false,
        loop: false,
        showHideOpacity: true,
      },
      iframe: '',
      files: [], // 附件数组
      images: [], // 图片数组
    }
  },
  mounted() {
    const params = this.$root.getQueryData();
    this.$data.article_id = params.id;
    // debugger;
    getArticle(this.$data.article_id).then((data) => {
      // 如果是投票或回执，跳转至投票页面
      if (data[0].vote_id || data[0].isreceipt) {
        const query = this.$root.encodeObj({id: this.$data.article_id});
        this.$root.replaceMobileWindow(`questionaireDetail?${query}`);
      }
      this.$data.article_like = data[0].article_like || 0;
      this.$data.author = data[0].author;
      this.$data.in_time = data[0].in_time;
      this.$data.like_count = data[0].like_count;
      this.$data.read_count = data[0].read_count || 0;
      this.$data.measure_count = data[0].measure_count;
      this.$data.text = data[0].text;
      this.$data.theme = data[0].theme;
      this.$data.title = data[0].title;
      this.$data.fn = data[0].function;
      if (this.$data.fn === 2) {
        const photos = data.photo_photo.map((item) => {
          return {
            src: item.photo,
            title: item.text
          }
        });
        this.$root.getUploadedImages(photos).then(data => {
          this.$data.photo_photo = data;
          this.$nextTick(() => {
            this.$refs.previewer1.show(0);
          });
        });
      } else if (this.$data.fn === 4) {
        if (data[0].text.match(/<iframe.*><\/iframe>/)) {
          let iframe = data[0].text.match(/<iframe.*><\/iframe>/)[0];
          const width = iframe.match(/width=['"](\d+)['"]/)[1];
          const height = iframe.match(/height=['"](\d+)['"]/)[1];
          const maxWidth = window.innerWidth;
          const fitHeight = Math.round(maxWidth/width*height);
          iframe = iframe.replace(/width=['"](\d+)['"]/, `width="${maxWidth}"`);
          iframe = iframe.replace(/height=['"](\d+)['"]/, `height="${fitHeight}"`);
          this.$data.iframe = iframe;
        }
      }
      // 获得所有下载文件
      this.$nextTick(() => {
        this.getDownloadFile(data[0].text);
        this.bindOtherLinkEvent(data[0].text);
        this.getAllImages(data[0].text);
      });
      window.shareData={
        title: this.$data.title,
        desc: $(this.$data.text).text(),
      };
    });
    Bridge.supportShare(true);
  },
  updated() {
  },
  beforeRouteLeave (to, from, next) {
    if(this.$preview.isShow){
      this.$preview.close();
    }
    next()
  }
}
</script>
<style lang='less' scoped>
.article-content{
  .title{
    color: #1a1a1a;
    font-size: 24px;
  }
}
.writing-button{
  position: absolute;
  bottom: 80px;
  right: 20px;
}
.round-button{
  &>img{
    display: block;
    width: 53px;
    height: 53px;
  }
}
.sub-button-box{
  position: absolute;
  top: 0;
  left: 0;
  width: 53px;
  opacity: 0;
  transform: translateX(0) translateY(-80px) translateZ(0);
  z-index: 0;
  &.show{
    opacity: 1;
    transform: translateX(0) translateY(-126px) translateZ(0);
  }
}
.fade-in-effect{
  transition: all 500ms ease;
}
.swiper-item-box{
  /*position: relative;*/
  .image-box{
    position: absolute;
    top: 45%;
    left: 0;
    transform: translate(0, -50%);
    width: 100%;
    &>img{
      display: block;
      width: 100%;
    }
  }
}
.bottom-text-box{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 20vh;
  background-color: rgba(0,0,0,0.5);
}

.file-link{
  color: blue;
  margin-left: 5px;
  text-decoration: underline;
}
</style>
<style lang='less'>
.paragraph{
  p{
    color: #2a2a2a!important;
    font-size: 16px!important;
    font-family: 'Lantinghei SC', 'Microsoft Yahei' !important;
    margin: 0!important;
    line-height: 32px!important;
    padding-bottom: 5px!important;
    background-color: #ffffff;
    text-indent: 0!important;
    white-space: normal!important;
  }
  span{
    font-family: 'Lantinghei SC', 'Microsoft Yahei' !important;
    font-size: 16px!important;
    line-height: 32px!important;
  }
}
.list-paddingleft-2{
  display: none;
}
</style>

