import {defineStore} from 'pinia'
import { getVideoList } from '@/services/video-list/video-list.js'
import { markRaw } from 'vue'
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
				const arr = res.data.map(item=>{
					return {
						id:item.id,
						cover:item.cover,
						name:item.name,
						playCount:item.playCount,
						duration:item.mv.videos[0].duration,
						artistName:item.artistName,
						id:item.id
					}
				})
				
        this.videoList = this.videoList.concat(markRaw(arr)) 
        this.hasMore = res.hasMore
      }
    }
  }
})