export function formatDuration(duration){
  // 转换成秒
  if(typeof duration == 'number'){
    duration = duration / 1000
    let seconds = Math.floor(duration) % 60
    duration -= seconds
    let minutes = Math.floor(duration / 60)
    if(seconds<10){
      seconds = '0' + seconds
    }
    if(minutes<10){
      minutes = '0' + minutes
    }
    return minutes + ':' + seconds
  }
}