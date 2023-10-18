<template>
	<view class="playlist" :style="{width:width+'rpx'}" @click="navToPlaylistDetail">
		<view class="cover-wrapper" :style="{width:width+'rpx',height:height+'rpx'}">
			<image class="cover" :src="playlist.coverImgUrl"></image>
			<text class="playCount">{{formatNumber(playlist.playCount)}}</text>
		</view>
		<text class="playlist-name" :style="{width:width+'rpx'}">{{playlist.name}}</text>
	</view>
</template>

<script setup>
	import {
		formatNumber
	} from '@/utils/formatNumber.js'
	const props = defineProps({
		playlist:Object,
		width:{
			type:String,
			default:'200'
		},
		height:{
			type:String,
			default:'200'
		}
	})
	const navToPlaylistDetail = ()=>{
		uni.navigateTo({
			url:'/pages/playlist-detail/playlist-detail?id='+props.playlist.id
		})
	}
</script>

<style lang="scss">
.playlist{
	margin-bottom: 20rpx;
}
.cover-wrapper{
	height: 200rpx;
	position: relative;
	.cover{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
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
.playlist-name{
	font-size: 24rpx;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>