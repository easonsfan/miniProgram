import {defineStore} from 'pinia'
import { getSwiperData } from '@/services/music/music.js'
export const useMusicStore = defineStore('music',{
  state:()=>{
    return {
      swiperData:[],//轮播图数据
    }
  },
  actions:{
    async getSwiperData(context){
      console.log(context);
      const res = await getSwiperData()
    }
  }
})