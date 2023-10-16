<template>
	<view style="box-sizing: border-box;padding: 20rpx;height: 100%;">
		<!-- 搜索栏 -->
		<view class="search-bar" @click="searchPage">
			<uv-icon name="search" color="#bbb" size="36rpx"></uv-icon>
			<text class="placeholder">搜索你喜欢的歌曲</text>
		</view>
		<!-- 轮播图 -->
		<uv-swiper height="280rpx" imgMode="widthFix" :list="banners" circular indicator indicatorMode="dot"></uv-swiper>
		<!-- 推荐歌曲 -->
		<uv-skeleton rows="10"  :loading="loading1">
			<music-section class="recommendSongs" title="推荐歌曲" :isMore="true" @clickMore="navToRankList('热歌榜')">
				<view class="song-wrapper" v-for="song in recommendSongs.slice(0,6)" :key="song.id">
					<view class="left-part">
						<image class="cover" :src="song.cover" ></image>
						<view class="desc">
							<text class="song-name">{{song.name}}</text>
							<text class="singer">{{song.singer}}</text>
						</view>
					</view>
					<view class="right-part">
						<uv-icon name="arrow-right" size="32rpx"></uv-icon>
					</view>
				</view>
			</music-section>
		</uv-skeleton>
		<!-- 热门歌单 -->
		<music-section class="hotPlaylist" title="热门歌单" :isMore="true" @clickMore="navToPlaylist">
			<uv-scroll-list :indicator="false">
				<playlist-item 
					:playlist="playlist" 
					v-for="(playlist,index) in hotPlaylist" 
					:key="playlist.id" 
					:style="{marginRight:hotPlaylist.length-1==index?'':'20rpx'}">
				</playlist-item>
			</uv-scroll-list>
		</music-section>
		<!-- 推荐歌单 -->
		<music-section class="recommendPlaylist" title="推荐歌单" :isMore="true" @clickMore="navToPlaylist">
			<uv-scroll-list :indicator="false">
				<playlist-item :playlist="playlist" v-for="(playlist,index) in recommendPlaylist" :key="playlist.id" :style="{marginRight:hotPlaylist.length-1==index?'':'20rpx'}"></playlist-item>
			</uv-scroll-list>
		</music-section>
		<!-- 巅峰榜 -->
		<uv-skeleton rows="7"  :loading="loading2">
			<music-section class="ranklist" title="巅峰榜">
				<view class="ranklist-wrapper">
					<view class="list new-songs" @click="navToRankList('新歌榜')">
						<view class="left-part">
							<text class="title">{{newSongs.name}}</text>
							<text class="song" v-for="(song,index) in newSongs?.tracks?.slice(0,3)" :key="song.id">{{index+1}}. {{song.name}} - {{song.singer}}</text>
						</view>
						<view class="right-part">
							<image class="cover" :src="newSongs.coverImgUrl"></image>
							<text class="playCount">{{formatNumber(newSongs.playCount)}}</text>
						</view>
					</view>
					<view class="list original-songs" @click="navToRankList('原创榜')">
						<view class="left-part">
							<text class="title">{{originalSongs.name}}</text>
							<text class="song" v-for="(song,index) in originalSongs?.tracks?.slice(0,3)" :key="song.id">{{index+1}}. {{song.name}} - {{song.singer}}</text>
						</view>
						<view class="right-part">
							<image class="cover" :src="originalSongs.coverImgUrl"></image>
							<text class="playCount">{{formatNumber(originalSongs.playCount)}}</text>
						</view>
					</view>
					<view class="list soar-songs" @click="navToRankList('飙升榜')">
						<view class="left-part">
							<text class="title">{{soarSongs.name}}</text>
							<text class="song" v-for="(song,index) in soarSongs?.tracks?.slice(0,3)" :key="song.id">{{index+1}}. {{song.name}} - {{song.singer}}</text>
						</view>
						<view class="right-part">
							<image class="cover" :src="soarSongs.coverImgUrl"></image>
							<text class="playCount">{{formatNumber(soarSongs.playCount)}}</text>
						</view>
					</view>
				</view>
			</music-section>
		</uv-skeleton>
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
		newSongs,
		originalSongs,
		soarSongs,
	} = storeToRefs(musicStore)
	// *****轮播图*****
	musicStore.getSwiperData()
	// *****推荐歌曲*****
	const loading1 = ref(false)
	musicStore.getRecommendSongs(loading1)
	// *****热门歌单*****
	musicStore.getHotPlaylist()
	// *****推荐歌单*****
	musicStore.getRecommendPlaylist()
	// *****巅峰榜*****
	const loading2 = ref(false)
	musicStore.getRankList(loading2)
	
	// 跳转到歌单列表
	const navToPlaylist = ()=>{
		uni.navigateTo({
			url:'/pages/playlist-list/playlist-list'
		})
	}
	// 跳转到排行榜
	const navToRankList = (title)=>{
		uni.navigateTo({
			url:'/pages/rank-list/rank-list?title='+title
		})
	}
</script>

<style lang="scss" scoped>
	.search-bar {
    display: flex;
    justify-content: center;
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
			.list{
				display: flex;
				overflow: hidden;
				border-radius: 10rpx;
				.left-part{
					width: 70%;
					display: flex;
					flex-direction: column;
					padding: 20rpx 0 0 20rpx;
					.title{
						margin-bottom: 10rpx;
					}
					.song{
						width: 440rpx;
						font-size: 24rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				.right-part{
					width: 30%;
					position: relative;
					.cover{
						width: 100%;
						height: 100%;
					}
					.playCount{
						padding: 8rpx;
						border-radius: 10rpx;
						position: absolute;
						right: 8rpx;
						bottom: 8rpx;
						font-size: 20rpx;
						background-color: rgba(0,0,0,0.5);
						color: #fff;
					}
				}
			}
		}
	}
</style>