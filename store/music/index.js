import {defineStore} from 'pinia'
import { getPlaylist, getRankPlaylist, getSwiperData } from '@/services/music/music.js'
import { markRaw } from 'vue'
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
        this.banners = markRaw(banners) 
      }
    },
		async getRecommendSongs(loading){
			loading.value = true
			const res = await getRankPlaylist({id:3778678})
			if(res.code == 200){
				const songs = res.playlist.tracks.map(item=>{
					return {
						id:item.al.id,
						name:item.name,
						cover:item.al.picUrl,
						singer:item.ar[0].name
					}
				})
				this.recommendSongs = markRaw(songs)
				loading.value = false
			}
		},
		async getHotPlaylist(){
			const res = await getPlaylist({limit:10,offset:0})
			if(res.code==200){
				const playlists = res.playlists.map(item=>{
					return {
						id:item.id,
						name:item.name,
						coverImgUrl:item.coverImgUrl,
						playCount:item.playCount
					}
				})
				this.hotPlaylist = markRaw(playlists) 
			}
		},
		async getRecommendPlaylist(){
			const res = await getPlaylist({limit:10,offset:0,cat:'华语'})
			if(res.code==200){
				const playlists = res.playlists.map(item=>{
					return {
						id:item.id,
						name:item.name,
						coverImgUrl:item.coverImgUrl,
						playCount:item.playCount
					}
				})
				this.recommendPlaylist = markRaw(playlists) 
			}
		},
		async getRankList(loading){
			// 新歌
			loading.value = true
			Promise.all([getRankPlaylist({id:3779629}),getRankPlaylist({id:2884035}),getRankPlaylist({id:19723756})])
			.then(res=>{
				res.forEach((result,index)=>{
					if(result.code==200){
						const info = {}
						info.id = result.playlist.id
						info.name = result.playlist.name
						info.coverImgUrl = result.playlist.coverImgUrl
						info.playCount = result.playlist.playCount
						info.tracks = result.playlist.tracks.map(item=>{
							return {
								id:item.id,
								name:item.name,
								singer: item.ar.map(ele=>{
									return ele.name
								}).join(' & ')
							}
						})
						if(index == 0){
							this.newSongs = markRaw(info)
						}else if(index == 1){
							this.originalSongs = markRaw(info)
						}else{
							this.soarSongs = markRaw(info)
						}
					}
				})
				loading.value = false
			})
		},
  }
})