import {defineStore} from 'pinia'
import {getVideoSrc,getVideoInfo,getRecommendVideo} from '@/services/detail/detail.js'
export const useVideoDetailStore = defineStore('videoDetail',{
	state:()=>{
		return{
			url:'',
			info:{}
		}
	},
	actions:{
		// 获取视频信息
		async getVideoInfo(videoId){
			const res = await getVideoInfo({mvid:videoId})
			if(res.code==200){
				this.info.song = res.data.name
				this.info.singer = res.data.artistName
				this.info.playCount = res.data.playCount
				this.info.publishTime = res.data.publishTime
			}
		},
		// 获取视频播放地址
		async getVideoSrc(videoId){
			const res = await getVideoSrc({id:videoId})
			if(res.code==200){
				this.url = res.data.url
			}
		},
		// 获取推荐视频
		async getRecommendVideo(videoId){
			const res = await getRecommendVideo({id:videoId})
			if(res.code==200){
				
			}
		},
	}
})