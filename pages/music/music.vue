<template>
	<view style="box-sizing: border-box;padding: 20rpx;height: 100%;">
		<!-- 搜索栏 -->
		<view class="search-bar" @click="searchPage">
			<uni-icons type="search" color="#bbb" size="18"></uni-icons>
			<text class="placeholder">搜索你喜欢的歌曲</text>
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper" :style="{height:swiperHeight}" indicator-dots :autoplay="false" circular :interval="3000"
			:duration="1000">
			<swiper-item class="swiper-item" v-for="(banner,index) in banners" :key="banner.bannerId">
				<image class="banner" :src="banner.pic" mode="widthFix" @load="setSwiperHeight(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 推荐歌曲 -->
		<music-section class="recommendSongs" title="推荐歌曲" :isMore="true" @clickMore="clickMore">
			<view class="left-part">
				123
			</view>
			<view class="right-part">
				<uni-icons type="right"></uni-icons>
			</view>
		</music-section>
		<!-- 巅峰榜 -->
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		storeToRefs
	} from 'pinia'
	import {
		useMusicStore
	} from '@/store/music/index.js'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	// *****设置轮播图高度*****
	const swiperHeight = ref('')
	const setSwiperHeight = (index) => {
		if (index != 0) return
		uni.createSelectorQuery().select('.banner').boundingClientRect((banner) => {
			swiperHeight.value = banner.height + 'px'
		}).exec()
	}
	// *****设置轮播图高度*****

	// *****搜索栏*****
	// 跳转到搜索页面
	const searchPage = () => {
		uni.navigateTo({
			url: "/pages/search/search"
		})
	}
	// *****搜索栏*****

	const musicStore = useMusicStore()
	const {
		banners,
		recommendSongs
	} = storeToRefs(musicStore)
	// *****轮播图*****
	musicStore.getSwiperData()
	// *****轮播图*****

	// *****推荐歌曲*****
	musicStore.getRecommendSongs()
	const clickMore = ()=>{
		console.log('go to more...');
	}
	// *****推荐歌曲*****
</script>

<style lang="scss" scoped>
	.search-bar {
		width: 100%;
		margin-bottom: 20rpx;
		background-color: #F8F8F8;
		border-radius: 40rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: #bbb;
		text-align: center;

		.placeholder {
			font-size: 28rpx;
			margin-left: 20rpx;
		}
	}

	.swiper-item {
		image {
			width: 100%;
		}
	}
	.recommendSongs{
		:deep(.content){
			display:flex;
			justify-content: space-between;
		}
	}
	
</style>