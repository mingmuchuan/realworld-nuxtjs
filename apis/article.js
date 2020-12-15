
import { request } from '@/plugins/request'
// 获取文章列表 
export function getArticles(params) {
  return request({
    url: "/api/articles",
    method: "get",
    params
  })
}

//获取需要的文章
export function getNeddArticles(params) {
  return request({
    url: "api/articles/feed",
    method: "get",
    params
  })
}

//点赞
export function favorite(slug) {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "post",
  })
}

//取消点赞
export function cancelFavorite(slug) {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "delete",
  })
}

//文章详情
export function articleDetail(slug) {
  return request({
    url: `/api/articles/${slug}`
  })
}

//评论列表
export function getCommentList(slug) {
  return request({
    url: `/api/articles/${slug}/comments`
  })
}