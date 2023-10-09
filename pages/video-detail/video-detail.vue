<template>
	<view>
		<video class="video" :src="url"></video>
		<view class="desc">
			<text class="song">{{info.song}}</text>
			<text class="singer">{{info.singer}}</text>
			<text class="song-attr">{{formatNumber(info.playCount)}}次播放 - {{info.publishTime}}</text>
		</view>
    <text>推荐视频</text>
		<scroll-view scroll-y="true" >
			<view v-for="item in recommendVideos" :key="item.id">{{item.name}}</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {onLoad} from "@dcloudio/uni-app"
	import {ref} from 'vue'
	import {storeToRefs} from 'pinia'
	import { useVideoDetailStore } from '@/store/video-detail/index.js'
	import {formatNumber} from '@/utils/formatNumber.js'
	const videoDetailStore = useVideoDetailStore()
	const {url,info,recommendVideos} = storeToRefs(videoDetailStore)
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
	margin-bottom: 20rpx;
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
