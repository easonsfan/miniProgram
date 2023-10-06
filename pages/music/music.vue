<template>
  <view style="box-sizing: border-box;padding: 20rpx;height: 100%;">
    <!-- 搜索栏 -->
    <view class="search-bar" @click="searchPage">
      <uni-icons type="search" color="#bbb" size="18"></uni-icons>
      <text class="placeholder">搜索你喜欢的歌曲</text>
    </view>
    <!-- 轮播图 -->
    <swiper class="swiper" :style="{height:swiperHeight}" indicator-dots :autoplay="false" circular :interval="3000" :duration="1000">
      <swiper-item class="swiper-item" v-for="(banner,index) in banners" :key="banner.bannerId">
        <image class="banner" :src="banner.pic" mode="widthFix" @load="setSwiperHeight(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 推荐歌曲 -->
    <view class="recommendSongs">
      <view class="header">
          <text class="title">推荐歌曲</text>
          <view class="more">
            <text>更多</text>
            <uni-icons type="right" ></uni-icons>
          </view>
      </view>
      <view class="content">
        
      </view>
    </view>
    <!-- 巅峰榜 -->
  </view>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useMusicStore} from '@/store/music/index.js'
import {onLoad} from '@dcloudio/uni-app'
// *********设置轮播图高度****************
const swiperHeight = ref('')
const setSwiperHeight = (index)=>{
  if(index!=0) return
  console.log('action');
  uni.createSelectorQuery().select('.banner').boundingClientRect((banner)=>{
    swiperHeight.value = banner.height + 'px'
  }).exec()
}
// *********设置轮播图高度****************
// 搜索栏
// 跳转到搜索页面
const searchPage = ()=>{
  uni.navigateTo({
    url:"/pages/search/search"
  })
}
// 轮播图
const musicStore = useMusicStore()
musicStore.getSwiperData()
const {banners} = storeToRefs(musicStore)
// 推荐歌曲

</script>

<style lang="scss" scoped>
  .search-bar{
    width: 100%;
    margin-bottom: 20rpx;
    background-color: #F8F8F8;
    border-radius: 40rpx;
    height: 70rpx;
    line-height: 70rpx;
    color:#bbb;
    text-align: center;
    .placeholder{
      font-size: 28rpx;
      margin-left: 20rpx;
    }
  }
  .swiper-item{
    image{
      width: 100%;
    }
  }
  .recommendSongs{
    margin-top: 20rpx;
  }
  .header{
    display: flex;
    justify-content: space-between;
    .title{
      font-weight: 700;
      font-size: 32rpx;
    }
    .more{
      text{
        font-size: 24rpx;
      }
      :deep(.uni-icons){
        font-size: 24rpx !important;
      }
    }
  }
</style>
