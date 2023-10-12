import {api} from '../index.js'
// 获取歌单详情
export function getPlaylistDetail(data){
	return api.get({url:'/playlist/detail',data})
}