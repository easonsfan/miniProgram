import {api} from '../index.js'
// 获取轮播图数据
export function getSwiperData(data){
  return api.get({url:'/banner',data})
}
// 获取排行榜歌曲
export function getRankPlaylist(data){
	return api.get({url:'/playlist/detail',data})
}
// 获取热门歌单、推荐歌单等
export function getPlaylist(data){
	return api.get({url:'/top/playlist',data})
}