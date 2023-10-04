<template>
  <view class="video-list">
    <video-item 
      v-for="item in videoList" 
      :key="item.id" 
      :imgSrc="item.cover" 
      :title="item.name" 
      :playCount="item.playCount" 
      :duration="item.mv.videos[0].duration"
      :singer="item.artistName"
	  :videoId="item.id"
    ></video-item>
  </view>
</template>

<script setup>
  import {storeToRefs} from 'pinia'
  import {useVideoStore} from '@/store/video/index.js'
  import { onReachBottom } from '@dcloudio/uni-app'
  import { onBeforeUnmount } from "vue";
  
  const videoStore = useVideoStore()
  videoStore.getVideoList()
  const {videoList,offset,hasMore} = storeToRefs(videoStore)
  
  onReachBottom(()=>{
    if(!hasMore) return
    offset.value = offset.value + 20
    videoStore.getVideoList()
    console.log('onReachBottom');
  })
  
  onBeforeUnmount(()=>{
    // videoStore.$reset()
    offset.value = 0
    videoList = []
  })
</script>

<style lang="scss">
  .video-list{
    padding: 40rpx 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
