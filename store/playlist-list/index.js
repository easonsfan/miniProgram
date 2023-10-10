import {defineStore} from 'pinia'
import { getHotPlaylistCats, getAllPlaylistCats } from '@/services/playlist-list/playlist-list.js'
export const usePlaylistStore = defineStore('playlist',{
	state:()=>{
		return {
			allCats:[], //歌单分类
			hotPlaylistCats:[],// 热门歌单分类
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
				this.hotPlaylistCats = res.tags.map(tag=>{
					return {name:tag.name}
				})
			}
		}
	}
})