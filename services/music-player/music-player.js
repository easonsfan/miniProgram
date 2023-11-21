import {api} from '../index.js'
// 获取歌曲信息
export function getSongInfo(data){
  return api.get({url:'/song/detail',data})
}
// 获取歌词
export function getSongLyric(data){
  return api.get({url:'/lyric',data})
}