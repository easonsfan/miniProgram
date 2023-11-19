<template>
  <view style="height: 100%;position: relative;overflow: hidden;">
    <view class="bg-img">
      <image :src="currentSong.al?.picUrl" style="width: 100%;height: 100%;" mode="aspectFill"/>
    </view>
    <view class="mask">        
    </view>
    <uv-navbar title="" @leftClick="back" bgColor="transparent" leftIconColor="#fff" leftIconSize="32rpx" style="position: relative;"></uv-navbar>
    <view class="player-area" :style="{height:`calc(100% - ${winHeight}px)`,marginTop:winHeight+'px'}">
      <swiper :indicator-dots="false" :autoplay="false" style="width: 100%;height: 100%;">
        <swiper-item>
          <view class="swiper-item">
            <view class="cover" style="width: 600rpx;height: 600rpx;">
              <image :src="currentSong.al?.picUrl" style="width: 100%;height: 100%;"/>
            </view>
            <view class="player-item">
              <view class="song-name">
                <text>{{currentSong.name}}</text>
              </view>
              <view class="singer">
                <text>{{currentSong?.ar[0]?.name}}</text>
              </view>
              <view class="lyric">
                <text>郭顶郭顶郭顶郭顶</text>
              </view>
              <view class="progress">
                <slider class="slider" :value="sliderValue" block-size="12" @change="sliderChangeEvent" @changing="sliderChangingEvent"/>
                <view class="time">
                  <text class="current">{{formatDuration(currentTime)}}</text>
                  <text class="duration">{{formatDuration(currentSong.dt)}}</text>
                </view>
              </view>
              <view class="operation">
                <image class="btn mode" src="../../static/player/play_order.png"></image>
                <image class="btn prev" src="../../static/player/play_prev.png"></image>
                <image 
                  class="btn pauseOrPlay" 
                  :src="`../../static/player/play_${isPlaying?'pause':'resume'}.png`"
                  @click="pauseOrPlay"
                ></image>
                <image class="btn next" src="../../static/player/play_next.png"></image>
                <image class="btn list" src="../../static/player/play_music.png"></image>
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
  import { onUnmounted, ref } from 'vue';
  import { storeToRefs } from 'pinia'
  import { useMusicPlayerStore } from '@/store/music-player/index.js'
  import { formatDuration } from '@/utils/formatTime';
  
  const musicPlayerStore = useMusicPlayerStore()
  const { currentSong } = storeToRefs(musicPlayerStore)
  
  const id = ref('')
  const winHeight = ref('')
  const currentTime = ref('00:00') // 歌曲播放的当前时间
  const musicPlayer = uni.createInnerAudioContext()
  const sliderValue = ref(0)
  let isSliderChanging = false // slider拖动时不需要设置进度条和时间
  let isPlaying = ref(false) // 是否播放状态
  
  onLoad(async (options)=>{
    await musicPlayerStore.getSongInfo(options.id)
    winHeight.value = uni.getSystemInfoSync().statusBarHeight + 44
    // 设置歌曲播放路径
    musicPlayer.src = `https://music.163.com/song/media/outer/url?id=${options.id}.mp3`
    // 监听歌曲是否能播放
    musicPlayer.onCanplay(()=>{
      musicPlayer.play()
    })
    // 监听歌曲播放时
    musicPlayer.onTimeUpdate(setProcess)
    // musicPlayer.onWaiting(()=>{
    //   musicPlayer.pause()
    //   console.log('pause');
    // })
    musicPlayer.onPlay(()=>{
      isPlaying.value = true
    })
    musicPlayer.onPause(()=>{
      isPlaying.value = false
    })
  })
  onUnmounted(()=>{
    musicPlayer.destroy()
  })
  // 设置当前播放时间和进度条
  const setProcess = ()=>{
    if(isSliderChanging) return
    // 设置当前时间
    currentTime.value = musicPlayer.currentTime * 1000
    // 设置滑动条位置
    sliderValue.value = Math.floor(musicPlayer.currentTime) * 1000 / currentSong.value.dt * 100
  }
  const back = ()=> {
    uni.navigateBack()
  }
  const sliderChangeEvent = (e)=>{
    musicPlayer.pause()
    currentTime.value = e.detail.value / 100 * currentSong.value.dt
    musicPlayer.seek(Math.floor(e.detail.value / 100 * currentSong.value.dt / 1000))
    musicPlayer.onSeeked(()=>{
      musicPlayer.play()
      isSliderChanging = false
    })
  }
  const sliderChangingEvent = (e)=>{
    isSliderChanging = true
    currentTime.value = e.detail.value / 100 * currentSong.value.dt
  }
  // 暂停或者播放
  const pauseOrPlay = ()=>{
    if(isPlaying.value){
      isPlaying.value = false
      musicPlayer.pause()
    }else{
      isPlaying.value = true
      musicPlayer.play()
    }
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
  .swiper-item{
    padding: 20rpx 75rpx;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .cover{
      border-radius: 10rpx;
      overflow: hidden;
      margin-top: 40rpx;
    }
    .player-item{
      padding-bottom: 40rpx;
      .song-name{
        font-size: 44rpx;
        font-weight: 700;
      }
      .singer{
        margin-top: 10rpx;
        font-size: 26rpx;
        color: #ccc;
      }
      .lyric{
        margin: 40rpx 0 20rpx 0;
        font-size: 26rpx;
        text-align: center;
      }
      .progress{
        .slider{
          margin: 10rpx 16rpx;
        }
        .time{
          display: flex;
          justify-content: space-between;
          font-size: 24rpx;
        }
      }
      .operation{
        margin-top: 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .mode{
          width: 80rpx;
          height: 80rpx;
        }
        .prev,.next,.list{
          width: 60rpx;
          height: 60rpx;
        }
        .pauseOrPlay{
          width: 120rpx;
          height: 120rpx;
        }
      }
    }
  }
}
</style>
