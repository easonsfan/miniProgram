import { defineStore } from 'pinia'
import { getSongInfo } from '@/services/music-player/music-player'
export const useMusicPlayerStore = defineStore('musicPlayer',{
  state:()=>{
    return {
      currentSong:{}
    }
  },
  actions:{
    async getSongInfo(id){
      const res = await getSongInfo({ids:id})
      this.currentSong = res.songs[0]
    }
  }
})