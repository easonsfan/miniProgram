import {defineStore} from 'pinia'
import { getHotSearch, getSearchRecommend, getSearchResult } from '../../services/search/search'
import { markRaw } from 'vue'
export const useSearchStore = defineStore('search',{
	state:()=>{
		return {
			hotSearch:[], // 热搜
			searchRecommend:[], // 搜索推荐
			searchResult:[], // 搜索结果
		}
	},
	actions:{
		async getHotSearch(){
			const res = await getHotSearch()
			if(res.code == 200){
				this.hotSearch = markRaw(res.result.hots)
			}
		},
		async getSearchRecommend(keyword){
			const res = await getSearchRecommend({keywords:keyword,type:'mobile'})
			if(res.code == 200){
				if(res.result.allMatch){
					this.searchRecommend = markRaw(res.result.allMatch)
				}else{
					this.searchRecommend = []
				}
				
			}
		},
		async getSearchResult(keyword,loading){
			loading.value = true
			const res = await getSearchResult({keywords:keyword})
			if(res.code == 200){
				const songs = res.result.songs.map(item=>{
					return {
						id:item.id,
						name:item.name,
						singer: item.artists.map(item=>{
							return item.name
						}).join(' & ')
					}
				})
				this.searchResult = markRaw(songs)
				loading.value = false
			}
		}
	}
})