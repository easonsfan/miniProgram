import {api} from '../index.js'
// 获取热门搜索
export function getHotSearch(data){
  return api.get({url:'/search/hot',data})
}
// 获取搜索推荐
export function getSearchRecommend(data){
  return api.get({url:'/search/suggest',data})
}
// 获取搜索结果
export function getSearchResult(data){
  return api.get({url:'/search',data})
}