<template>
	<view class="music-section">
		<view class="header">
			<text class="title">{{title}}</text>
			<view class="more" v-if="isMore" @click="moreEvent">
				<text class="text">更多</text>
				<uv-icon name="arrow-right" size="24rpx"></uv-icon>
			</view>
		</view>
		<view class="content">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['title', 'isMore'])
	const emit = defineEmits(['clickMore'])
	const moreEvent = ()=>{
		emit('clickMore')
	}
</script>

<style lang="scss">
	.music-section {
		margin-top: 20rpx;
		
		.header {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.title {
				font-weight: 700;
				font-size: 32rpx;
			}

			.more {
				.text {
					font-size: 24rpx !important;
				}
			}
		}
	}
</style>