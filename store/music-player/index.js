import { defineStore } from 'pinia'
import { getSongInfo } from '@/services/music-player/music-player'
export const useMusicPlayerStore = defineStore('musicPlayer',{
  state:()=>{
    return {
      cover:''
    }
  },
  actions:{
    async getSongInfo(id){
      const res = await getSongInfo({ids:id})
      this.cover = res.songs[0].al.picUrl
    }
  }
})