import {defineStore} from 'pinia'
import { getPlaylist, getRankPlaylist, getSwiperData } from '@/services/music/music.js'
import { readonly } from 'vue'
export const useMusicStore = defineStore('music',{
  state:()=>{
    return {
      banners:[''],//轮播图数据
			recommendSongs:[],//推荐歌曲
			hotPlaylist:[],// 热门歌单
			recommendPlaylist:[],// 推荐歌单
			newSongs:{}, // 新歌榜单
			originalSongs:{}, // 原创榜单
			soarSongs:{}, // 飙升榜单
    }
  },
  actions:{
    async getSwiperData(){
      const res = await getSwiperData({type:2})
      if(res.code == 200){
				const banners = []
				for(let banner of res.banners){
					banners.push(banner.pic)
				}
        this.banners = readonly(banners) 
      }
    },
		async getRecommendSongs(){
			const res = await getRankPlaylist({id:3778678})
			if(res.code == 200){
				this.recommendSongs = readonly(res.playlist.tracks)
			}
		},
		async getHotPlaylist(){
			const res = await getPlaylist({limit:10,offset:0})
			if(res.code==200){
				this.hotPlaylist = readonly(res.playlists) 
			}
		},
		async getRecommendPlaylist(){
			const res = await getPlaylist({limit:10,offset:0,cat:'华语'})
			if(res.code==200){
				this.recommendPlaylist = readonly(res.playlists) 
			}
		},
		async getRankList(){
			// 新歌
			getRankPlaylist({id:3779629}).then(res=>{
				if(res.code == 200){
					this.newSongs = readonly(res.playlist)
				}
			})
			// 原创
			getRankPlaylist({id:2884035}).then(res=>{
				if(res.code == 200){
					this.originalSongs = readonly(res.playlist)
				}
			})
			// 飙升
			getRankPlaylist({id:19723756}).then(res=>{
				if(res.code == 200){
					this.soarSongs = readonly(res.playlist)
				}
			})
		},
  }
})