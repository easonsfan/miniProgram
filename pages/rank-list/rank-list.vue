<template>
	<view class="song-list">
		<text class="title">{{title}}</text>
		<view class="wrapper" v-for="(song,index) in songList" :key="song.id" @click="navToMusicPlayer(song.id)">
			<text class="order">{{index + 1}}</text>
			<view class="song">
				<text class="name">{{song.name}}</text>
				<text class="singer">{{song.singer}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		storeToRefs
	} from 'pinia'
	import {
		useMusicStore
	} from '@/store/music/index.js'
	import {
		markRaw,
		ref
	} from 'vue'
	const musicStore = useMusicStore()
	const {
		recommendSongs,
		newSongs,
		originalSongs,
		soarSongs,
	} = storeToRefs(musicStore)
	const songList = ref([])
	const title = ref('')
	onLoad((options) => {
		uni.setNavigationBarTitle({
			title: options.title
		})
		title.value = options.title
		if (options.title == '热歌榜') {
			songList.value = markRaw(recommendSongs.value)
		} else if (options.title == '新歌榜') {
			songList.value = markRaw(newSongs.value.tracks)
		} else if (options.title == '原创榜') {
			songList.value = markRaw(originalSongs.value.tracks)
		} else if (options.title == '飙升榜') {
			songList.value = markRaw(soarSongs.value.tracks)
		}
	})
  // 跳转到播放页面
	const navToMusicPlayer = (id) => {
		uni.navigateTo({
			url:'/pages/music-player/music-player?id='+id
		})
	}
</script>

<style lang="scss">
	.song-list {
		.title{
			display: inline-block;
			font-size: 32rpx;
			font-weight: 700;
			margin-top: 20rpx;
			padding-left: 20rpx;
		}
		.wrapper {
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
	}
</style>