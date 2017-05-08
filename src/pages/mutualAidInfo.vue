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
            <x-button action-type="button">取消</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" action-type="button" @click.native="sendComment">确定</x-button>
          </flexbox-item>
        </flexbox>
      </box>
    </popup>
  </div>
</template>
<script>
import { getMutualInfo, getCommentList, sendComment, likeComment, likeMutual } from '@/assets/js/ajax.js'
import { Card, Grid, GridItem, Popup, Group, XTextarea, Flexbox, FlexboxItem, XButton, Box } from 'vux'
export default {
  name: 'mutualAidInfo',
  components: {
    Grid, GridItem, Popup, Group, XTextarea, Flexbox, FlexboxItem, XButton, Box
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
  },
  mounted() {
    const query = this.$root.getQueryData();
    this.$data.id = query ? query.id : 0;
    getMutualInfo(this.$data.id).then((data) => {
      if (data.state == 0) {
        this.$data.article = data.order;
      }
    });
    this.getNewestCommentList();
    this.$vux.alert.show({
      title: '温馨提示',
      content: '本栏目信息是由会员自行发布，平台不对发布内容的真实性负责',
      onShow () {},
      onHide () {}
    });
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
</style>









