import router from 'vue-router'
import { rootVue } from '@/main.js'
import $ from 'jquery'
const sendAjax = (url, payload, params = {}) => {
  const query = $.param(payload || '')
  if (navigator.onLine) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'post',
        url,
        data: {
          ...payload,
        },
        success(data){
          if (data.state == 10000 && localStorage.getItem('userType') === 'user') {
            const query = rootVue.encodeObj({
              url: location.href
            });
            rootVue.replaceMobileWindow(`login?${query}`);
          }
          if (data.state == 0 || data.state === undefined) {
            localStorage.setItem(`${url}?${query}`, JSON.stringify(data));
          }
          resolve(data);
        },
        error(data){
          reject(data);
        },
        ...params,
      })
    })
  } else {
    const cache = localStorage.getItem(`${url}?${query}`);
    return $.Deferred().resolve(JSON.parse(cache));
  }
}
export const getUserData = (open_id) => {
  return sendAjax('/home/index/userdata', {open_id});
}
export const getSubscription = (user_id) => {
  // 用户是否关注了该公众号
  return sendAjax("/home/user/get_subscriptions", { "id":user_id });
}
export const getPublicPortal = () => {
  return sendAjax("/home/show/PublicPortal");
}
export const getPortalLists = () => {
  return sendAjax('/home/show/PortalLists');
}
export const getPortalArticle = (portalId) => {
  return sendAjax('/home/show/PortalArticle', { id: portalId });
}
export const getPortalCarousel = (portalId) => {
  return sendAjax('/index.php/home/show/PortalCarousel', { id: portalId });
}
export const getPortalTheme = (portalId) => {
  return sendAjax('/index.php/home/show/PortalTheme', { id: portalId });
}
export const getMainData = (page = 1, themes, key, isthemeclick, isquestionarticle, isopen, isend) => {
  return sendAjax(
    '/home/article/lists',
    {
      theme_id: themes || [],
      page,
      number: 10,
      isthemeclick: 1,
      key, isthemeclick, isquestionarticle, isopen, isend
    }
  );
}
export const getUnreadList = (page = 1, portalId) => {
  return sendAjax(
    '/home/article/lists',
    { page: page,
      number: 10,
      isopen: 2,
      portal_id: portalId,
    }
  );
}
export const getArticle = (id) => {
  return sendAjax('/home/index/show', { id } );
}
export const toggleDianzan = (id, key) => {
  return sendAjax('/home/article/ArticleLike', { id, key });
}
export const toggleShoucang = (id) => {
  return sendAjax('/home/question/measure', { id });
}
export const getThemeTag = (themeId) => {
  return sendAjax('/home/theme/ThemeTag', { id: themeId });
}
export const getVoteArticle = (page, tag_id, portal_id) => {
  return new Promise((resolve, reject) => {
    getTagArticle(page, tag_id, portal_id).then(data => {
      let index = 0;
      if (data.order.length == 0) {
        resolve(data);
        return;
      }
      for(let i = 0, length = data.order.length; i < length; i++){
        getArticleVoteCount(data.order[i].id).then(data2=>{
          data.order[i].voteCount=data2.order.count;
          index ++;
          if (index === length) {
            resolve(data);
          }
        });
      }
    });
  });
}
export const getArticleVoteCount = (articleId) => {
  return sendAjax('/home/article/ArticleVoteCount', { id: articleId });
}
export const getArticleVoteInfo = (articleId) => {
  return sendAjax('/home/article/ArticleVoteInfo', { id: articleId });
}
export const getVoteInfo = (articleId) => {
  return sendAjax('/home/vote/VoteInfo', { id: articleId });
}
// 内容推荐
export const recommend = (article_id, type, text) => {
  return sendAjax(
    '/home/question/recommend',
    {
      article_id,
      type,
      text,
    }
  );
}
// 建议
export const commentapi = (id, type, text) => {
  return sendAjax(
    '/home/index/commentapi',
    {
      id,
      type,
      text,
    }
  );
}
// 提案
export const question = (portal_id, type, title, text) => {
  return sendAjax(
    '/home/question/question',
    {
      portal_id,
      type,
      title,
      text,
    }
  );
}
//问卷提交
export const pushAnswers = (id,select) => {
  return sendAjax('/home/vote/vote', { id,select });
}
export const getTagArticle = (page, tag_id, portal_id) => {
  return sendAjax('/home/article/lists', { page, tag_id, portal_id, number: 10 });
}
export const getMutualList = (page, portal_id) => {
  return sendAjax('/home/mutual/mutualList', { page, portal_id, number: 10 });
}
export const getMutualInfo = (id) => {
  return sendAjax('/home/mutual/mutualInfo', { id });
}
export const likeMutual = (id, key) => {
  return sendAjax('/home/mutual/mutualLike', { id, key });
}
export const getCommentList = (mutual_id, page) => {
  return sendAjax('/home/mutual/CommentList', { mutual_id, page, number: 10 });
}
export const sendComment = (id, text) => {
  return sendAjax('/home/mutual/Comment', { id, text });
}
export const likeComment = (id, key) => {
  return sendAjax('/home/mutual/commentLike', { id, key });
}
export const sendReceipt = (id, answer) => {
  return sendAjax('/home/show/ReceiptAnswer', { id, answer });
}
export const mutualPublish = (portal_id, title, text, photo) => {
  return sendAjax('/home/mutual/mutualPublish', { portal_id, title, text, photo });
}


