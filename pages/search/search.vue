<template>
	<view class="search">
		<view class="search-box">
			<uv-search v-model="searchValue" :focus="true" @custom="handleSearch" @change="handleChange"
				@search="handleSearch" @focus="handleFocus" height="64rpx" @clear="handleClear"></uv-search>
		</view>
		<view class="search-recommend" v-show="searchValue.trim()!=''&&isFocus">
			<template v-if="searchRecommend.length>0">
				<view class="keyword" v-for="(item,index) in searchRecommend" :key="index" @click="searchSongs(item.keyword)">
					<uv-icon name="search" size="40rpx"></uv-icon>
					<text class="name">{{item.keyword}}</text>
				</view>
			</template>
			<view class="keyword" style="justify-content: center;" v-else>
				<text class="name">暂无搜索结果</text>
			</view>
		</view>
		<view class="hot-search" v-show="searchValue.trim()==''">
			<text style="font-size: 36rpx;font-weight: 700;">热门搜索</text>
			<view class="keyword">
				<text class="name" v-for="(item,index) in hotSearch" :key="index" @click="searchSongs(item.first)">{{item.first}}</text>
			</view>
		</view>
		<view class="search-result" v-show="showResult&&!isFocus">
			<uv-loading-icon :show="loading" text="加载中" :vertical="true"></uv-loading-icon>
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="result-list" v-for="(song,index) in searchResult" :key="song.id">
					<text class="order">{{index + 1}}</text>
					<view class="song">
						<text class="name">{{song.name}}</text>
						<text class="singer">{{song.singer}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref
	} from "vue";
	import {storeToRefs} from 'pinia'
	import {useSearchStore} from '@/store/search/index.js'
	const searchStore = useSearchStore()
	const { hotSearch,searchRecommend,searchResult } = storeToRefs(searchStore)
	searchStore.getHotSearch()
	
	const searchValue = ref('')
	const showResult = ref(false)
	const isFocus = ref(false)
	const loading = ref(false)
	const handleChange = (keyword) => {
		if(keyword.trim()!=''){
			searchStore.getSearchRecommend(keyword)
		}
	}
	const handleSearch = (keyword) => {
		if(keyword.trim()!=''){
			searchResult.value = []
			searchStore.getSearchResult(keyword,loading)
			showResult.value = true
			isFocus.value = false
		}
	}
	const searchSongs = (keyword) => {
		if(keyword.trim()!=''){
			searchValue.value = keyword
			searchResult.value = []
			searchStore.getSearchResult(keyword,loading)
			showResult.value = true
			isFocus.value = false
		}
	}
	const handleFocus = () => {
		if(searchValue.value.trim()!=''){
			searchStore.getSearchRecommend(searchValue.value)
		}
		isFocus.value = true
	}
	const handleClear = () =>{
		console.log('clear');
	}
</script>
<style lang="scss">
	.search{
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
	}
	.search-recommend{
		.keyword{
			display: flex;
			align-items: center;
			height: 80rpx;
			.name{
				font-size: 24rpx;
				margin-left: 10rpx;
			}
		}
	}
	.hot-search{
		margin-top: 60rpx;
		.keyword{
			display: flex;
			flex-wrap: wrap;
			.name{
				margin-top: 20rpx;
				padding: 0 20rpx;
				font-size: 28rpx;
			}
		}
	}
	.search-result{
		flex:1;
		overflow: hidden;
		padding-top: 20rpx;
		box-sizing: border-box;
		.result-list {
			display: flex;
			height: 100rpx;
		}
		.order {
			width: 80rpx;
			font-size: 28rpx;
			line-height: 100rpx;
			text-align: center;
		}
		.song {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
		
			.name {
				width: 500rpx;
				font-size: 28rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		
			.singer {
				width: 500rpx;
				font-size: 24rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.uv-loading-icon{
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-22px,-25px);
		}
	}
</style>