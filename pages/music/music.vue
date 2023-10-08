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
			<view class="song-wrapper" v-for="song in recommendSongs.slice(0,6)" :key="song.al.id">
				<view class="left-part">
					<image class="cover" :src="song.al.picUrl" ></image>
					<view class="desc">
						<text class="song-name">{{song.name}}</text>
						<text class="singer">{{song.ar[0].name}}</text>
					</view>
				</view>
				<view class="right-part">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
		</music-section>
		<!-- 热门歌单 -->
		<music-section class="hotPlaylist" title="热门歌单" :isMore="true" @clickMore="clickMore">
			<scroll-view scroll-x="true" style="white-space: nowrap;">
				<view class="playlist" v-for="playlist in hotPlaylist" :key="playlist.id">
					<view class="cover-wrapper">
						<image class="cover" :src="playlist.coverImgUrl"></image>
						<text class="playCount">{{formatNumber(playlist.playCount)}}</text>
					</view>
					<text class="playlist-name">{{playlist.name}}</text>
				</view>
			</scroll-view>
		</music-section>
		<!-- 推荐歌单 -->
		<music-section class="recommendPlaylist" title="推荐歌单" :isMore="true" @clickMore="clickMore">
			<scroll-view scroll-x="true" style="white-space: nowrap;">
				<view class="playlist" v-for="playlist in recommendPlaylist" :key="playlist.id">
					<view class="cover-wrapper">
						<image class="cover" :src="playlist.coverImgUrl"></image>
						<text class="playCount">{{formatNumber(playlist.playCount)}}</text>
					</view>
					<text class="playlist-name">{{playlist.name}}</text>
				</view>
			</scroll-view>
		</music-section>
		<!-- 巅峰榜 -->
		<music-section class="ranklist" title="巅峰榜">
			<view class="ranklist-wrapper">
				<view class="new-songs">
					1
				</view>
				<view class="original-songs">
					2
				</view>
				<view class="soar-songs">
					3
				</view>
			</view>
		</music-section>
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
	import {
		formatNumber
	} from '@/utils/formatNumber.js'
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
		recommendSongs,
		hotPlaylist,
		recommendPlaylist,
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
	
	// *****热门歌单*****
	musicStore.getHotPlaylist()
	// *****热门歌单*****
	
	// *****推荐歌单*****
	musicStore.getRecommendPlaylist()
	// *****推荐歌单*****
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
		.banner {
			width: 100%;
		}
	}
	.recommendSongs{
		.song-wrapper{
			display:flex;
			justify-content: space-between;
			padding-bottom: 20rpx;
		}
		.left-part{
			display: flex;
			.cover{
				width: 120rpx;
				height: 120rpx;
				border-radius: 16rpx;
			}
			.desc{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: 16rpx;
				.song-name{
					font-size: 28rpx;
				}
				.singer{
					font-size: 24rpx;
					color: #aaa;
				}
			}
		}
		.right-part{
			display: flex;
			align-items: center;
		}
	}
	.recommendPlaylist,
	.hotPlaylist{
		.playlist{
			display: inline-block;
			width: 230rpx;
		}
		.cover-wrapper{
			width: 200rpx;
			height: 200rpx;
			position: relative;
			.cover{
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
			}
			.playCount{
				padding: 8rpx;
				border-radius: 20rpx;
				position: absolute;
				right: 8rpx;
				bottom: 8rpx;
				font-size: 20rpx;
				background-color: rgba(0,0,0,0.5);
				color: #fff;
			}
		}
		.playlist-name{
			width: 200rpx;
			height: 64rpx;
			font-size: 24rpx;
			white-space: normal;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
	.ranklist{
		.ranklist-wrapper{
			.new-songs,
			.original-songs,
			.soar-songs
			{
				height: 200rpx;
				background-color: #eeeeee;
				margin-bottom: 20rpx;
			}
		}
	}
</style>