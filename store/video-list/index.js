import {defineStore} from 'pinia'
import { getVideoList } from '@/services/video-list/video-list.js'
export const useVideoStore = defineStore('video',{
  state:()=>{
    return {
      videoList:[],
      offset:0,
      hasMore:true,
    }
  },
  actions:{
    async getVideoList(){
      const res = await getVideoList({
        limit:20,
        offset:this.offset,
      })
      if(this.hasMore){
        this.videoList = this.videoList.concat(res.data) 
        this.hasMore = res.hasMore
      }
    }
  }
})