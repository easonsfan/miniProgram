import {api} from '../index.js'
// 获取所有歌单分类
export function getAllPlaylistCats(data){
	return api.get({url:'/playlist/catlist',data})
}
// 获取热门歌单分类
export function getHotPlaylistCats(data){
	return api.get({url:'/playlist/hot',data})
}