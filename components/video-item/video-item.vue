<template>
  <view class="video-item container">
    <view class="cover">
      <image class="img" :src="imgSrc" mode="widthFix"></image>
      <view class="playCount">
        <uni-icons type="videocam" size="16"></uni-icons>
        <text class="playCount-text">{{playCount}}</text>
      </view>
      <text class="duration">{{durationStr}}</text>
    </view>
    <view class="title" :title="title + ' - ' + singer">
      <text>{{title + ' - ' + singer}}</text>
    </view>
    
  </view>
</template>
<script setup>
  import { formatDuration } from '@/utils/formatTime.js'
  import { computed } from "vue";
  const props = defineProps(['imgSrc','title','duration','playCount','singer'])
  const durationStr = computed(()=>{
    return formatDuration(props.duration)
  })
</script>

<style lang="scss">
  .container{
    width: 46vw;
    height: 300rpx;
    .title{
      font-size: 28rpx;
      margin-top: 10rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .cover{
      position: relative;
      
      .img{
        width: 100%;
        vertical-align: bottom;
        border-radius: 8rpx;
      }
      .duration,.playCount{
        position:absolute;
        bottom: 6rpx;
        color: #fff;
        font-size: 24rpx;
      }
      .duration{
        right: 8rpx;
      }
      .playCount{
        left: 8rpx;
        display: flex;
        align-items: center;
        text{
          color: #fff !important;
          padding-right: 8rpx;
          vertical-align: middle;
        }
      }
      
    }
  }
</style>