import {api} from '../index.js'
export function getSwiperData(data){
  return api.get({url:'/banner',data})
}