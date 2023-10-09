import {api} from '../index.js'
export function getVideoSrc(data){
  return api.get({url:'/mv/url',data})
}
export function getVideoInfo(data){
  return api.get({url:'/mv/detail',data})
}
export function getRecommendVideo(data){
  return api.get({url:'/related/allvideo',data})
}