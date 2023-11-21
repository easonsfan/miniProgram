import { defineStore } from 'pinia'
import { getSongInfo, getSongLyric } from '@/services/music-player/music-player'
import { parseLyric } from '@/utils/parseLyric.js';
export const useMusicPlayerStore = defineStore('musicPlayer',{
  state:()=>{
    return {
      currentSong:{},
      lyrics:null
    }
  },
  actions:{
    async getSongInfo(id){
      const res = await getSongInfo({ids:id})
      if(res.code == 200){
        this.currentSong = res.songs[0]
      }
    },
    async getSongLyric(id){
      const res = await getSongLyric({id})
      if(res.code == 200){
        this.lyrics = parseLyric(res.lrc.lyric)
      }
    }
  }
})