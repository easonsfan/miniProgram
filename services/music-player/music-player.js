import {api} from '../index.js'
// 获取歌曲信息
export function getSongInfo(data){
  return api.get({url:'/song/detail',data})
}