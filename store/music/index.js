import {defineStore} from 'pinia'
import { getRecommendSongs, getSwiperData } from '@/services/music/music.js'
export const useMusicStore = defineStore('music',{
  state:()=>{
    return {
      banners:[],//轮播图数据
	  recommendSongs:[],//推荐歌曲
    }
  },
  actions:{
    async getSwiperData(){
      const res = await getSwiperData({type:2})
      if(res.code == 200){
        this.banners = res.banners
      }
    },
	async getRecommendSongs(){
		const res = await getRecommendSongs({id:3778678})
		if(res.code == 200){
			this.recommendSongs = res.playlist.tracks.slice(0,6)
			console.log(this.recommendSongs);
		}
	}
  }
})