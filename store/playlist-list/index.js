import {defineStore} from 'pinia'
import { getPlaylistCatList } from '@/services/playlist-list/playlist-list.js'
export const usePlaylistStore = defineStore('playlist',{
	state:()=>{
		return {}
	},
	actions:{
		async getPlaylistCatList(){
			const res = await getPlaylistCatList()
		}
	}
})