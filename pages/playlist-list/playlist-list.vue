<template>
	<view class="playlist-list">
		<uv-tabs
			:list="hotPlaylistCats" 
			:itemStyle="{height:'80rpx'}" 
			:activeStyle="{fontSize:'32rpx'}" 
			:inactiveStyle="{fontSize:'32rpx'}"
			lineWidth="44rpx"
			:current="currentTab"
			@change="tabChange"
		>
		</uv-tabs>
		<swiper class="swiper" :indicator-dots="false" :autoplay="false" @change="swiperChange" :current="currentSwiper">
			<swiper-item v-for="cat in hotPlaylistCats" :key="cat.name">
				<uv-loading-icon :show="loading" text="加载中" :vertical="true"></uv-loading-icon>
				<scroll-view style="height: 100%;" :scroll-y="true" :enable-flex="true">
					<view class="scroll-view">
						<view class="item" v-for="playlist in playlists[cat.name]" :key="playlist.id">
							<playlist-item :playlist="playlist" width="220" height="220"></playlist-item>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import {usePlaylistStore} from '@/store/playlist-list/index.js'
	import { onUnmounted, ref } from "vue";
	const playlistStore = usePlaylistStore()
	const {allCats,hotPlaylistCats,playlists} = storeToRefs(playlistStore)
	playlistStore.getAllPlaylistCats()
	playlistStore.getHotPlaylistCats().then(()=>{
		// 初始化第一页歌单数据
		playlistStore.getPlaylistByCat(hotPlaylistCats.value[0]['name'],loading)
	})
	
	const loading = ref(false)
	const currentTab = ref(0)
	const currentSwiper = ref(0)
	// 切换标签获取对应歌单
	const tabChange = e => {
		currentSwiper.value = e.index
		playlistStore.getPlaylistByCat(hotPlaylistCats.value[e.index]['name'],loading)
	}
	// 切换swiper获取对应歌单
	const swiperChange = e=> {
		currentTab.value = e.detail.current
		playlistStore.getPlaylistByCat(hotPlaylistCats.value[e.detail.current]['name'],loading)
	}
	onUnmounted(()=>{
		// 清空歌单列表数据
		playlistStore.$reset()
	})
</script>

<style lang="scss">
	.playlist-list{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.swiper{
		flex: 1;
	}
.scroll-view{
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx;
	.item:nth-child(3n-1){
		margin: 0 24rpx;
	}
}
.uv-loading-icon{
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-22px,-25px);
}
</style>
