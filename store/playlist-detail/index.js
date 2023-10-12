import {defineStore} from 'pinia'
import { getPlaylistDetail } from '@/services/playlist-detail/playlist-detail'
export const usePlaylistDetailStore = defineStore('playlistDetail',{
	state:()=>{
		return{
			
		}
	},
	actions:{
		async getPlaylistDetail(id){
			const res = await getPlaylistDetail({id})
		}
	}
})