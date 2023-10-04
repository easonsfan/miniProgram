<template>
	<view>
		<video class="video" :src="url"></video>
		<view class="desc">
			<text class="song">{{info.song}}</text>
			<text class="singer">{{info.singer}}</text>
			<text class="song-attr">{{info.playCount}}次播放 - {{info.publishTime}}</text>
		</view>
		<scroll-view scroll-y="true" >
			<view>1</view>
			<view>2</view>
			<view>3</view>
			<view>4</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {onLoad} from "@dcloudio/uni-app"
	import {ref} from 'vue'
	import {storeToRefs} from 'pinia'
	import { useVideoDetailStore } from '@/store/detail/index.js'
	const videoDetailStore = useVideoDetailStore()
	const {url,info} = storeToRefs(videoDetailStore)
	onLoad((options)=>{
		videoDetailStore.getVideoInfo(options.videoId)
		videoDetailStore.getVideoSrc(options.videoId)
		videoDetailStore.getRecommendVideo(options.videoId)
	})
</script>

<style lang="scss">
.video{
	width: 100%;
}
.desc{
	display: flex;
	flex-direction: column;
	// margin: 10rpx 0;
	padding-left: 20rpx;
	text{
		font-size: 24rpx;
		margin: 8rpx 0;
	}
	.song{
		font-weight: 700;
		font-size: 32rpx;
	}
}
</style>
