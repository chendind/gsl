import router from 'vue-router'
import $ from 'jquery'
$.ajaxSetup({
  type: 'post',
  success(data){
    if (data.state === 10000) {

    }
  }
});
export const getUserData = (open_id) => {
  return $.ajax({
    url: '/home/index/userdata',
    timeout:10000,
    data: {
      open_id,
    }
  });
}
export const getSubscription = (user_id) => {
  // 用户是否关注了该公众号
  return $.ajax({
    url: "/home/user/get_subscriptions",
    data: {
      "id":user_id,
    },
  });
}
export const getPublicPortal = () => {
  return $.ajax({
    url: "/home/show/PublicPortal",
    data: {
    },
  });
}
export const getPortalLists = () => {
  return $.ajax({
    url:'/home/show/PortalLists'
  });
}
export const getPortalArticle = (portalId) => {
  return $.ajax({
    url:'/home/show/PortalArticle',
    data: {
      id: portalId,
    }
  });
}
export const getPortalCarousel = (portalId) => {
  return $.ajax({
    url:'/index.php/home/show/PortalCarousel',
    data: {
      id: portalId,
    }
  });
}
export const getPortalTheme = (portalId) => {
  return $.ajax({
    url:'/index.php/home/show/PortalTheme',
    data: {
      id: portalId,
    }
  });
}
export const getMainData = (page = 1, themes, key, isthemeclick, isquestionarticle, isopen, isend) => {
  return $.ajax({
    url:'/home/article/lists',
    data: {
      theme_id: themes || [],
      page,
      number: 10,
      isthemeclick: 1,
      key, isthemeclick, isquestionarticle, isopen, isend
    }
  });
}
export const getUnreadList = (page = 1, portalId) => {
  return $.ajax({
    url: '/home/article/lists',
    type: 'post',
    data: {
      page: page,
      number: 10,
      isopen: 2,
      portal_id: portalId,
    }
  });
}
export const getArticle = (id) => {
  return $.ajax({
    url: '/home/index/show',
    type: 'post',
    data: {
      id
    }
  });
}
export const toggleDianzan = (id, key) => {
  return $.ajax({
    url: '/home/article/ArticleLike',
    type: 'post',
    data: {
      id, key
    }
  });
}
export const toggleShoucang = (id) => {
  return $.ajax({
    url: '/home/question/measure',
    type: 'post',
    data: {
      id
    }
  });
}
export const getThemeTag = (themeId) => {
  return $.ajax({
    url:'/home/theme/ThemeTag',
    data: {
      id: themeId
    }
  });
}
export const getArticleVoteCount = (articleId) => {
  return $.ajax({
    url:'/home/article/ArticleVoteCount',
    data: {
      id: articleId
    }
  });
}
export const getArticleVoteInfo = (articleId) => {
  return $.ajax({
    url:'/home/article/ArticleVoteInfo',
    data: {
      id: articleId
    }
  });
}
export const getVoteInfo = (articleId) => {
  return $.ajax({
    url:'/home/vote/VoteInfo',
    data: {
      id: articleId
    }
  });
}
// 内容推荐
export const recommend = (article_id, type, text) => {
  return $.ajax({
    url:'/home/question/recommend',
    data: {
      article_id,
      type,
      text,
    }
  });
}
// 建议
export const commentapi = (id, type, text) => {
  return $.ajax({
    url:'/home/index/commentapi',
    data: {
      id,
      type,
      text,
    }
  });
}
// 提案
export const question = (portal_id, type, title, text) => {
  return $.ajax({
    url: '/home/question/question',
    data: {
      portal_id, type, title, text
    }
  })
}


