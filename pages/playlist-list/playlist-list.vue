<template>
	<view>
		123
	</view>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import {usePlaylistStore} from '@/store/playlist-list/index.js'
	import { ref } from "vue";
	const playlistStore = usePlaylistStore()
	playlistStore.getPlaylistCatList()
</script>

<style lang="scss">

</style>
