import {api} from '../index.js'
// 获取视频列表
export function getVideoList(data){
  return api.get({url:"/top/mv",data})
}