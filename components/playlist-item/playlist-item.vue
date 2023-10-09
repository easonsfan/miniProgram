<template>
	<view class="playlist" v-for="playlist in playlists" :key="playlist.id">
		<view class="cover-wrapper">
			<image class="cover" :src="playlist.coverImgUrl"></image>
			<text class="playCount">{{formatNumber(playlist.playCount)}}</text>
		</view>
		<text class="playlist-name">{{playlist.name}}</text>
	</view>
</template>

<script setup>
	import {
		formatNumber
	} from '@/utils/formatNumber.js'
	const props = defineProps(['playlists'])
</script>

<style lang="scss">
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
</style>