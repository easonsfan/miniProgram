<template>
  <view style="height: 100%;position: relative;overflow: hidden;">
    <view class="bg-img">
      <image :src="currentSong.picUrl" style="width: 100%;height: 100%;" mode="aspectFill"/>
    </view>
    <view class="mask">        
    </view>
    <uv-navbar title="" @leftClick="back" bgColor="transparent" leftIconColor="#fff" leftIconSize="32rpx" style="position: relative;"></uv-navbar>
    <view class="player-area" :style="{height:`calc(100% - ${winHeight}px)`,marginTop:winHeight+'px'}">
      <swiper :indicator-dots="false" :autoplay="false" style="width: 100%;height: 100%;">
        <swiper-item>
          <view class="swiper-item">
            <view class="cover" style="width: 600rpx;height: 600rpx;">
              <image :src="currentSong.picUrl" style="width: 100%;height: 100%;"/>
            </view>
            <view class="player-item">
              <view class="song-name">
                <text>{{currentSong.name}}</text>
              </view>
              <view class="singer">
                <text>{{currentSong.singer}}</text>
              </view>
              <view class="lyric" style="height: 80rpx;line-height: 80rpx;overflow: hidden;">
                <text >{{lyricText}}</text>
              </view>
              <view class="progress">
                <slider class="slider" :value="sliderValue" block-size="12" @change="sliderChangeEvent" @changing="sliderChangingEvent"/>
                <view class="time">
                  <text class="current">{{formatDuration(currentTime)}}</text>
                  <text class="duration">{{formatDuration(currentSong.dt)}}</text>
                </view>
              </view>
              <view class="operation">
                <image class="btn mode" :src="`../../static/player/play_${currentMode}.png`" @click="modeChangeEvent"></image>
                <image class="btn prev" src='../../static/player/play_prev.png' @click="prevSong"></image>
                <image 
                  class="btn pauseOrPlay" 
                  :src="`../../static/player/play_${isPlaying?'pause':'resume'}.png`"
                  @click="pauseOrPlay"
                ></image>
                <image class="btn next" src='../../static/player/play_next.png' @click="nextSong"></image>
                <image class="btn list" src='../../static/player/play_music.png'></image>
              </view>
            </view>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">
            <scroll-view scroll-y class="lyric-wrapper" :scroll-top="currentLyricIndex * 35">
              <view 
                :class="['text',currentLyricIndex==index?'active':'']" 
                :style="{paddingTop:index==0?'600rpx':0,paddingBottom:index==lyrics.length-1?'300rpx':0}" 
                v-for="(lyric,index) in lyrics" 
                :key="lyric.time">
                  {{lyric.text}}
              </view>
            </scroll-view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
  <uv-toast ref="toast"></uv-toast>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { onUnmounted, ref, getCurrentInstance } from 'vue';
  import { storeToRefs } from 'pinia'
  import { useMusicPlayerStore } from '@/store/music-player/index.js'
  import { formatDuration } from '@/utils/formatTime.js';
  
  const musicPlayerStore = useMusicPlayerStore()
  const { currentSong, lyrics } = storeToRefs(musicPlayerStore)
  
  const toast = ref(null)
  let id = null // 当前歌曲id
  const winHeight = ref('')
  const currentTime = ref('00:00') // 歌曲播放的当前时间
  let musicPlayer;
  const sliderValue = ref(0)
  let isSliderChanging = false // slider拖动时不需要设置进度条和时间
  const isPlaying = ref(false) // 是否播放状态
  const lyricText = ref('') // 当前播放的歌词
  let currentLyricIndex = 0 // 当前播放歌词的位置
  const modeArr = ['order','repeat','random']
  const currentMode = ref('order') // 当前播放模式
  let currentModeIndex = 0 // 当前播放模式索引
  let songsList = [] // 歌曲列表
  let isInitMusicPlayer = true // 是否初始化播放器，进入页面以及歌曲播放错误都需要初始化播放器
  
  const back = ()=> {
    uni.navigateBack()
  }
  onLoad(async (options)=>{
    const pages = getCurrentPages()
    const page = pages[pages.length - 1];
    const eventChannel = page.getOpenerEventChannel()
    eventChannel.on('sendSongsList',data=>{
      songsList = data.songsList // 获取歌曲列表
    })
    
    winHeight.value = uni.getSystemInfoSync().statusBarHeight + 44
    
    id = options.id
    setMusicPlayer(options.id)
  })
  onUnmounted(()=>{
    musicPlayer.destroy()
  })
  const createMusicPlayer = ()=>{
    musicPlayer = uni.createInnerAudioContext()
    // 监听歌曲是否能播放
    musicPlayer.onCanplay(()=>{
      musicPlayer.play()
      console.log('play');
    })
    // 监听歌曲播放时
    musicPlayer.onTimeUpdate(setProcess)
    musicPlayer.onWaiting(()=>{
      console.log('waiting');
    })
    musicPlayer.onPlay(()=>{
      isPlaying.value = true
    })
    musicPlayer.onPause(()=>{
      isPlaying.value = false
    })
    musicPlayer.onSeeked(()=>{
      musicPlayer.play()
      isSliderChanging = false
    })
    musicPlayer.onEnded(()=>{
      changeNewSong('next')
    })
    musicPlayer.onError((res)=>{
      console.log(res);
      if(!res||res.errCode){
        musicPlayer.destroy()
        isInitMusicPlayer = true
        toast.value.show({
          type:'default',
          message:'播放错误，切换到下一首',
          duration: 1000
        })
        changeNewSong('next')
      }
    })
  }
  const setMusicPlayer = async (id)=>{
    if(isInitMusicPlayer){
      createMusicPlayer()
    }
    isInitMusicPlayer = false
    await musicPlayerStore.getSongInfo(id)
    await musicPlayerStore.getSongLyric(id)
    musicPlayer.stop()
    // 设置歌曲播放路径
    musicPlayer.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // musicPlayer.autoplay = true
  }
  // 设置当前播放时间和进度条
  const setProcess = ()=>{
    if(isSliderChanging) return
    // 设置当前时间
    currentTime.value = musicPlayer.currentTime * 1000
    setLyric(currentTime.value)
    // 设置滑动条位置
    sliderValue.value = Math.floor(musicPlayer.currentTime) * 1000 / currentSong.value.dt * 100
  }
  // 设置当前歌词
  const setLyric = (currentTime)=>{
    for(let i = 0; i < lyrics.value.length; i++){
      if(currentTime >= lyrics.value[i].time){
        lyricText.value = lyrics.value[i].text
        currentLyricIndex = i
      }
    }
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
  
  const sliderChangeEvent = (e)=>{
    musicPlayer.pause()
    currentTime.value = e.detail.value / 100 * currentSong.value.dt
    musicPlayer.seek(Math.floor(e.detail.value / 100 * currentSong.value.dt / 1000))
  }
  const sliderChangingEvent = (e)=>{
    isSliderChanging = true
    currentTime.value = e.detail.value / 100 * currentSong.value.dt
  }
  const modeChangeEvent = ()=>{
    currentModeIndex += 1
    if(currentModeIndex == modeArr.length){
      currentModeIndex = 0
    }
    currentMode.value = modeArr[currentModeIndex]
  }
  const prevSong = ()=>{
    changeNewSong('prev')
  }
  const nextSong = ()=>{
    changeNewSong('next')
  }
  const changeNewSong = (direction)=>{
    let index
    // 获取歌曲列表的当前播放歌曲的位置
    for(let i=0; i<songsList.length;i++){
      if(id == songsList[i].id){
        index = i
        break
      }
    }
    switch(currentModeIndex){
      case 0: // 顺序播放
        index = direction == 'prev'? index-1 : index+1 
        if(index == -1){
          index = songsList.length - 1
        }
        if(index > songsList.length-1){
          index = 0
        }
        break;
      case 1: // 单曲循环
        break;
      case 2: // 随机播放
        const randomIndex = Math.floor(Math.random() * songsList.length)
        if(randomIndex == index){
          index += 1
        }else{
          index = randomIndex
        }
        break;
    }
    id = songsList[index].id // 获取新的要播放的歌曲id
    setMusicPlayer(id)
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
.uv-toast__content__text{
  font-size: 32rpx;
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
    .lyric-wrapper{
      display: flex;
      flex-direction: column;
      height:100%;
      font-size: 28rpx;
      .text{
        margin-bottom: 20rpx;
        text-align: center;
      }
      .active{
        color: #0f0;
      }
    }
  }
}
</style>
