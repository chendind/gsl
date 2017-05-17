<template>
  <div v-show="article.title !== undefined">
    <div class="full-page-box scroll-box" style="bottom: 60px;">
      <div class="header pd15 bg-white">
        <div class="title">{{article.title}}</div>
        <div class="meta color-light-grey size12 mv10">
          {{article.in_time | time3}}
          <div class="pull-right">阅读 {{article.read_count}} 次</div>
        </div>
        <div class="text color-light-grey size14">
          {{article.text}}
        </div>
        <flexbox wrap="wrap" :gutter="0">
          <flexbox-item :span="4" v-for="(image, $index) in uploadedImages" :key="$index" class="preview-img" @click.native="previewImage($index)">
            <div class="three-img-box">
              <div class="inner-box bg-center" :style="{'background-image': `url(${image.src})`}">
              </div>
            </div>
          </flexbox-item>
        </flexbox>
        <div class="mv10"></div>
      </div>
      <div class="comment-box bg-white mv10">
        <div class="weui-panel weui-panel_access">
          <div class="weui-panel__hd color-black">共 {{commentCount}} 条评论</div>
          <div class="weui-panel__hd comment" v-for="(comment, $index) in commentList">
            <div class="header">
              <img :src="comment.avatar" class="avatar">
              <div class="color-indigo-blue size14">
                {{comment.name}}
                <div class="pull-right color-light-grey size12">
                  {{comment.in_time | time2}}
                </div>
              </div>
              <div class="color-light-grey size12">{{comment.section}}</div>
            </div>
            <div class="text size14 color-deep-grey mv10">
              {{comment.text}}
            </div>
            <div class="text-pull-right">
              <span class="mh10 pv10" @click="toggleLikeComment(comment, $index)">
                <img :src="require('@/assets/image/zan_blue.png')" class="icon-xs" v-show="comment.comment_like">
                <img :src="require('@/assets/image/zan_grey.png')" class="icon-xs" v-show="!comment.comment_like">
                {{comment.like_count}}
              </span>
              <span class="pv10" @click="toggleDislikeComment(comment, $index)">
                <img :src="require('@/assets/image/cai_blue.png')" class="icon-xs" v-show="comment.comment_dislike">
                <img :src="require('@/assets/image/cai_grey.png')" class="icon-xs" v-show="!comment.comment_dislike">
                {{comment.dislike_count}}
              </span>
            </div>
          </div>
          <div class="weui-panel__bd">
            <div class="vux-card-content pd15 color-aunt-red size14 text-center" @click="getMoreCommentList">
              <span v-show="allLoad">暂无更多评论</span>
              <span v-show="!allLoad">查看更多评论</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <grid class="grid theme-bar bottom-operator bg-white no-before no-after" :rows="3">
        <grid-item class="grid-item grid-item3 no-before no-after" @on-item-click="toggleLikeMutual()">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/zan_grey.png')" v-show="!article.islike">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/zan_blue.png')" v-show="article.islike">
          <span slot="label" class="grid-item-label size12 color-light-grey">点赞 {{article.like_count}}</span>
        </grid-item>
        <grid-item class="grid-item grid-item3 no-before no-after" @on-item-click="comment()">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/com_grey.png')">
          <span slot="label" class="grid-item-label size12 color-light-grey">评论</span>
        </grid-item>
        <grid-item class="grid-item grid-item3 no-before no-after" @on-item-click="toggleDislikeMutual()">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/cai_grey.png')" v-show="!article.isdislike">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/cai_blue.png')" v-show="article.isdislike">
          <span slot="label" class="grid-item-label size12 color-light-grey">踩踩 {{article.dislike_count}}</span>
        </grid-item>
      </grid>
    </div>
    <popup v-model="commentShow" position="bottom" width="100%" class="bg-white">
      <group title="评论">
        <x-textarea placeholder="请输入内容" autofocus ref="commentTextarea" v-model="commentText"></x-textarea>
      </group>
      <box gap="10px 10px">
        <flexbox>
          <flexbox-item>
            <x-button action-type="button" @click.native="commentShow = false">取消</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" action-type="button" @click.native="sendComment">确定</x-button>
          </flexbox-item>
        </flexbox>
      </box>
    </popup>
    <previewer :list="uploadedImages" ref="previewer" :options="previewerOption"></previewer>
  </div>
</template>
<script>
import { getMutualInfo, getCommentList, sendComment, likeComment, likeMutual } from '@/assets/js/ajax.js'
import { Card, Grid, GridItem, Popup, Group, XTextarea, Flexbox, FlexboxItem, XButton, Box, Previewer } from 'vux'
export default {
  name: 'mutualAidInfo',
  components: {
    Grid, GridItem, Popup, Group, XTextarea, Flexbox, FlexboxItem, XButton, Box, Previewer
  },
  data() {
    return {
      id: 0,
      article: {},
      commentList: [],
      commentCount: 0,
      commentShow: false,
      commentText: '',
      allLoad: false,
      uploadedImages: [],
      previewerOption: {
        fullscreenEl: false,
        shareEl: false,
        counterEl: true,
        arrowEl: true,
        spacing: 0,
        pinchToClose: true,
        history:false,
        galleryPIDs:false,
        loop: false,
      }
    }
  },
  methods: {
    toggleLikeComment(comment, $index){
      const islike = comment.comment_like || 0;
      const commentList = this.$data.commentList;
      likeComment(comment.id, 1 - islike).then((data) => {
        if (data.state == 0) {
          commentList[$index] = {
            ...comment,
            ...data.order,
            comment_like: 1 - islike,
            comment_dislike: 0
          };
          this.$data.commentList = [...commentList];
        }
      });
    },
    toggleDislikeComment(comment, $index){
      const isdislike = comment.comment_dislike || 0;
      const commentList = this.$data.commentList;
      likeComment(comment.id, isdislike - 1).then((data) => {
        if (data.state == 0) {
          commentList[$index] = {
            ...comment,
            ...data.order,
            comment_dislike: 1 - isdislike,
            comment_like: 0,
          };
          this.$data.commentList = [...commentList];
        }
      });
    },
    toggleLikeMutual(){
      const islike = this.$data.article.islike || 0;
      likeMutual(this.$data.id, 1 - islike).then((data) => {
        if (data.state == 0) {
          this.$data.article = {
            ...this.$data.article,
            ...data.order,
            islike: 1 - islike,
            isdislike: 0,
          };
        }
      })
    },
    toggleDislikeMutual(){
      const isdislike = this.$data.article.isdislike || 0;
      likeMutual(this.$data.id, isdislike - 1).then((data) => {
        if (data.state == 0) {
          this.$data.article = {
            ...this.$data.article,
            ...data.order,
            isdislike: 1 - isdislike,
            islike: 0,
          };
        }
      })
    },
    getNewestCommentList(){
      getCommentList(this.$data.id, 1).then((data) => {
        if (data.state == 0) {
          this.$data.commentList = data.order;
          this.$data.commentCount = data.count;
          if (data.order.length == 10) {
            this.$data.allLoad = false;
          } else {
            this.$data.allLoad = true;
          }
        }
      })
    },
    getMoreCommentList(){
      if (!this.$data.allLoad) {
        const page = Math.floor(this.$data.commentList.length / 10) + 1;
        getCommentList(this.$data.id, page).then((data) => {
          if (data.state == 0) {
            this.$data.commentList = [...this.$data.commentList, ...data.order];
            this.$data.commentCount = data.count;
            if (data.order.length < 10) {
              this.$data.allLoad = true;
            }
          }
        })
      }
    },
    comment(){
      this.$data.commentShow = true;
      this.$nextTick(() => {
        this.$refs.commentTextarea.focus();
      });
    },
    sendComment(){
      sendComment(this.$data.id, this.$data.commentText).then((data) => {
        if (data.state == 0) {
          this.getNewestCommentList();
          this.$vux.alert.show({
            title: '提示',
            content: '评论成功',
            onShow () {},
            onHide () {}
          });
          this.$data.commentText = '';
        }
        this.$data.commentShow = false;
      })
    },
    previewImage(index){
      this.$refs.previewer.show(index);
    },
    getPhotos(photo_ids){
      const promiseList = [];
      photo_ids.forEach((item) => {
        let photo_id = item;
        // 对于当时直接存为完整url的情况，取出其中的图片ID值
        if ((/cloudstore\/(\w+)?\?/).test(photo_id)){
          photo_id = item.match(/cloudstore\/(\w+)?\?/)[1]
        }
        promiseList.push(this.getCloudFileUrl(photo_id));
      })
      Promise.all(promiseList).then((data) => {
        if (data.length) {
          const uploadedImages = data.map((item) => {
            return {
              src: item.result
            }
          });
          this.$root.getUploadedImages(uploadedImages).then(data => {
            this.$data.uploadedImages = data;
          });
        }
      });
    },
    getCloudFileUrl(photo_id){
      return new Promise((resolve) => {
        if (this.$root.isApp) {
          Bridge.getCloudFileUrl(photo_id,null,function(s){
            resolve(s);
          });
        } else {
          resolve({
            result: 'http://yzz-server.780.cn/file/f36283bb88f6faeec92245ea87cf160e/cloudstore/5d10557c4b3b6c1f37aa7a0611ef64a9?GUID=52986787a28e906053c801c0e227a2cd&MD5=1300caa4e8c33c9d21699c6ba558c857'
          })
        }
      })
    },
  },
  mounted() {
    const query = this.$root.getQueryData();
    this.$data.id = query ? query.id : 0;
    getMutualInfo(this.$data.id).then((data) => {
      if (data.state == 0) {
        this.$data.article = data.order;
        this.getPhotos(data.order.photo);
        window.shareData={
          title: this.$data.article.title,
          text: this.$data.article.text,
        };
      }
    });
    this.getNewestCommentList();
    this.$vux.alert.show({
      title: '温馨提示',
      content: '本栏目信息是由会员自行发布，平台不对发布内容的真实性负责',
      onShow () {},
      onHide () {}
    });
    Bridge.supportShare(true);
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>
.comment{
  .header{
    position: relative;
    padding-left: 50px;
    .avatar{
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.bottom-operator{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
}
.grid{
  padding: 10px 0 5px;
  background-color: #fff;
}
.grid-item{
  padding: 2px 10px !important;
}
.write-comment-box{

}
.three-img-box{
  padding: 5px;
  >.inner-box{
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    height: 0;
     >.image{
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 100%;
      opacity: 0;
    }
  }
}
</style>









