import {defineStore} from 'pinia'
import { getPlaylistDetail } from '@/services/playlist-detail/playlist-detail'
import { markRaw } from 'vue'
export const usePlaylistDetailStore = defineStore('playlistDetail',{
	state:()=>{
		return{
			playlistInfo:{
				cover:'',
				name:null,
				creator:{},
				description:null,
				subscribedCount:0
			},
			songList:[],
		}
	},
	actions:{
		async getPlaylistDetail(id){
			const res = await getPlaylistDetail({id})
			if(res.code == 200){
				this.playlistInfo['cover'] = res.playlist.backgroundCoverUrl||res.playlist.coverImgUrl
				this.playlistInfo['description'] = res.playlist.description
				console.log(this.playlistInfo['description']);
				this.playlistInfo['name'] = res.playlist.name
				this.playlistInfo['subscribedCount'] = res.playlist.subscribedCount
				this.playlistInfo['creator'] = {
					avatar: res.playlist.creator.avatarUrl,
					nickname: res.playlist.creator.nickname,
				}
				const list = res.playlist.tracks.map(item=>{
					return {
						id:item.id,
						name:item.name,
						singer: item.ar.map(ele=>{
							return ele.name
						}).join(' & ')
					}
				})
				this.songList = markRaw(list)
			}
		}
	}
})