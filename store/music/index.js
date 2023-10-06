import {defineStore} from 'pinia'
import { getSwiperData } from '@/services/music/music.js'
export const useMusicStore = defineStore('music',{
  state:()=>{
    return {
      banners:[],//轮播图数据
    }
  },
  actions:{
    async getSwiperData(){
      const res = await getSwiperData({type:2})
      if(res.code == 200){
        this.banners = res.banners
      }
    }
  }
})