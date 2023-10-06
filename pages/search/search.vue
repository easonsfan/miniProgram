<template>
  <view>
    <uni-search-bar 
      v-model="searchValue"
      placeholder="搜索你喜欢的歌曲"
      radius="20"
      :focus="true"
    ></uni-search-bar>
  </view>
</template>

<script setup>
import { ref } from "vue";
const searchValue = ref('')
</script>

<style lang="scss">

</style>
