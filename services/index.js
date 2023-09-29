class Api{
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }
  request(method,url,data){
    return new Promise((resolve,reject)=>{
      uni.request({
        url:this.baseUrl + url,
        data,
        method,
        success(res){
          resolve(res.data)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }
  get({url,data}){
    return this.request('GET',url,data)
  }
  post({url,data}){
    return this.request('POST',url,data)
  }
}
export const api = new Api('http://codercba.com:9002')