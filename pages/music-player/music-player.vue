<template>
  <view style="height: 100%;position: relative;" >
    <view class="bg-img">
      <image :src="cover" style="width: 100%;height: 100%;" mode="aspectFill"/>
    </view>
    <view class="mask">        
    </view>
    <uv-navbar title="" @leftClick="leftClick" bgColor="transparent" leftIconColor="#fff" leftIconSize="32rpx" style="position: relative;"></uv-navbar>
    <view class="player-area" :style="{height:`calc(100% - ${winHeight}px)`,marginTop:winHeight+'px'}">
      <swiper :indicator-dots="false" :autoplay="false" style="width: 100%;height: 100%;">
        <swiper-item>
          <view class="swiper-item">
            <view class="cover" style="width: 600rpx;height: 600rpx;">
              <image :src="cover" style="width: 100%;height: 100%;"/>
            </view>
            <view class="player-item">
              <view class="song-name">
                <text>凄美地</text>
              </view>
              <view class="singer">
                <text>郭顶</text>
              </view>
              <view class="lyric">
                <text>郭顶郭顶郭顶郭顶</text>
              </view>
              <view class="progress">
                <slider block-size="12" @change="sliderChangeEvent"/>
              </view>
            </view>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">
            456
          </view>
        </swiper-item>
      </swiper>
      
    </view>
  </view>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia'
  import { useMusicPlayerStore } from '@/store/music-player/index.js'
  const id = ref('')
  const winHeight = ref('')
  const musicPlayerStore = useMusicPlayerStore()
  const { cover } = storeToRefs(musicPlayerStore)
  onLoad((options)=>{
    musicPlayerStore.getSongInfo(options.id)
    winHeight.value = uni.getSystemInfoSync().statusBarHeight + 44
    console.log(uni.getSystemInfoSync());
  })
  const leftClick = ()=> {
    uni.navigateBack()
  }
  const sliderChangeEvent = (e)=>{
    console.log(e);
  }
</script>

<style lang="scss">
.bg-img{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
}
.mask{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  backdrop-filter: blur(10px);
}
.player-area{
  color: #fff;
  .cover{
    border-radius: 10rpx;
    overflow: hidden;
  }
  .swiper-item{
    padding: 20rpx 75rpx;
    box-sizing: border-box;
    height: 100%;
  }
}
</style>
