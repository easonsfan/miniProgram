<template>
	<view>
		<uv-tabs
			:list="hotPlaylistCats" 
			:itemStyle="{height:'8vh'}" 
			:activeStyle="{fontSize:'32rpx',color}" 
			:inactiveStyle="{fontSize:'32rpx'}"
			lineWidth="44rpx"
		>
		</uv-tabs>
		<swiper :style="{height:'92vh'}" :indicator-dots="false" :autoplay="false">
			<swiper-item>
				<scroll-view scroll-y="true" >
					<view v-for="index in 100" :key="index">
						{{index}}
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">2</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import {usePlaylistStore} from '@/store/playlist-list/index.js'
	import { ref } from "vue";
	const playlistStore = usePlaylistStore()
	const {allCats,hotPlaylistCats} = storeToRefs(playlistStore)
	playlistStore.getAllPlaylistCats()
	playlistStore.getHotPlaylistCats()
</script>

<style lang="scss">

</style>
