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
export const getPortalArticle = (factionId) => {
  return $.ajax({
    url:'/home/show/PortalArticle',
    data: {
      id: factionId,
    }
  });
}
export const getPortalCarousel = (factionId) => {
  return $.ajax({
    url:'/index.php/home/show/PortalCarousel',
    data: {
      id: factionId,
    }
  });
}
export const getPortalTheme = (factionId) => {
  return $.ajax({
    url:'/index.php/home/show/PortalTheme',
    data: {
      id: factionId,
    }
  });
}
export const getMainData = (page = 1, themes) => {
  return $.ajax({
    url:'/home/article/lists',
    data: {
      theme_id: themes || [],
      page,
      number: 10,
      isthemeclick: 1,
    }
  });
}
export const getUnreadList = (page = 1, factionId) => {
  return $.ajax({
    url: '/home/article/lists',
    type: 'post',
    data: {
      page: page,
      number: 10,
      isopen: 2,
      portal_id: factionId,
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








