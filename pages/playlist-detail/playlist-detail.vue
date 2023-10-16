<template>
	<view>
		<view class="playlist-info">
			<image class="cover" :src="playlistInfo.cover" mode="aspectFill"></image>
			<view class="desc">
				<image class="cover" :src="playlistInfo.cover" ></image>
				<view class="info">
					<text class="name">{{playlistInfo.name}}</text>
					<view class="creator">
						<image class="avatar" :src="playlistInfo.creator.avatar"></image>
						<text class="nickname">{{playlistInfo.creator.nickname}}</text>
					</view>
				</view>
			</view>
			<view class="descText">
				<text class="text">简介：{{playlistInfo.description?.replace(/[\n]/g,' ')}}</text>
				<uv-icon name="arrow-right" size="28rpx"></uv-icon>
			</view>
			<view class="function">
				<view class="like">
					<uv-icon name="heart" size="40rpx"></uv-icon>
					<text>{{playlistInfo.subscribedCount}}</text>
				</view>
				<view class="share">
					<uv-icon name="share-square" size="40rpx"></uv-icon>
					<text>分享</text>
				</view>
			</view>
		</view>
		<view class="song-list">
			<view class="wrapper" v-for="(song,index) in songList" :key="song.id" @click="navToPlayMusic(song.id)">
				<text class="order">{{index + 1}}</text>
				<view class="song">
					<text class="name">{{song.name}}</text>
					<text class="singer">{{song.singer}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import { ref } from "vue";
	import { storeToRefs } from 'pinia'
	import {usePlaylistDetailStore} from '@/store/playlist-detail/index.js'
	const playlistDetailStore = usePlaylistDetailStore()
	const {playlistInfo,songList } = storeToRefs(playlistDetailStore)
	onLoad((options)=>{
		playlistDetailStore.getPlaylistDetail(options.id)
	})
	const navToPlayMusic = (id)=>{
		console.log(id);
	}
</script>

<style lang="scss">
.playlist-info{
	height: 440rpx;
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;
	color: #fff;
	>.cover{
		width: 100%;
		height: 100%;
		position: absolute;
		filter: blur(5px);
		z-index: -1;
	}
	.desc{
		display: flex;
		margin-top: 60rpx;
		padding: 0 40rpx;
		.cover{
			width: 240rpx;
			height: 240rpx;
			border-radius: 10rpx;
		}
		.info{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			flex: 1;
			margin-left: 20rpx;
			.name{
				display: inline-block;
				width: 100%;
			}
			.creator{
				display: flex;
				align-items: center;
				.avatar{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					margin-right: 10rpx;
				}
				.nickname{
					font-size: 24rpx;
				}
			}
		}
		.content{
			font-size: 24rpx;
		}
	}
	.descText{
		margin-top: 20rpx;
		font-size: 24rpx;
		padding: 0 40rpx;
		.text{
			display:inline-block;
			max-width: 90%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.uv-icon{
			display: inline-block !important;
			overflow: hidden;
			.uvicon-arrow-right{
				color: #fff !important;
			}
		}
	}
	.function{
		display: flex;
		justify-content: space-around;
		font-size: 28rpx;
		margin-top: 20rpx;
		.like,.share{
			display: flex;
		}
		.uv-icon{
			margin-right: 10rpx;
			.uv-icon__icon{
				color: #fff !important;
			}
		}
	}
}
.song-list{
	.wrapper{
		display: flex;
		height: 100rpx;
	}
	.order{
		width: 80rpx;
		font-size: 28rpx;
		line-height: 100rpx;
		text-align: center;
	}
	.song{
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		.name{
			width: 500rpx;
			font-size: 28rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.singer{
			font-size: 24rpx;
		}
	}
}
</style>
