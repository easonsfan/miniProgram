<template>
	<view>
		<view class="desc">
			1
		</view>
		<view class="song-list">
			2
		</view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import { ref } from "vue";
	import {usePlaylistDetailStore} from '@/store/playlist-detail/index.js'
	const playlistDetailStore = usePlaylistDetailStore()
	onLoad((options)=>{
		playlistDetailStore.getPlaylistDetail(options.id)
	})
</script>

<style lang="scss">
.desc{
	
}
</style>
