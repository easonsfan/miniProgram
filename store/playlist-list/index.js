import {defineStore} from 'pinia'
import { getPlaylistByCat, getHotPlaylistCats, getAllPlaylistCats } from '@/services/playlist-list/playlist-list.js'
import { readonly } from 'vue'
export const usePlaylistStore = defineStore('playlist',{
	state:()=>{
		return {
			allCats:[], //歌单分类
			hotPlaylistCats:[],// 热门歌单分类
			playlists:{}, // 歌单列表
		}
	},
	actions:{
		async getAllPlaylistCats(){
			const res = await getAllPlaylistCats()
			if(res.code == 200){
				// this.allCats = res.
			}
		},
		async getHotPlaylistCats(){
			const res = await getHotPlaylistCats()
			if(res.code == 200){
				const catList = res.tags.map(tag=>{
					return {name:tag.name}
				})
				this.hotPlaylistCats = catList
			}
		},
		async getPlaylistByCat(cat,loading){
			if(this.playlists[cat]) return
			loading.value = true
			const res = await getPlaylistByCat({limit:20,offset:0,cat})
			if(res.code ==200){
				this.playlists[cat] = readonly(res.playlists) 
				loading.value = false
			}
		}
	}
})