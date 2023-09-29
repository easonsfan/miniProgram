<template>
  <view>
    <uni-search-bar 
      v-model="searchValue" 
      placeholder="搜索你喜欢的歌曲"
      radius="20"
      @confirm="confirmEvent"
     >
    </uni-search-bar>
  </view>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useMusicStore} from '@/store/music/index.js'
const searchValue = ref('')
// const musicStore = useMusicStore()
// musicStore.getSwiperData()
// const {swiperData} = storeToRefs(musicStore)
// console.log(swiperData);
</script>

<style lang="scss" scoped>
  
</style>
