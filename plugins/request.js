import axios from 'axios'
import qs from 'qs'

//此函数作为插件方法，可以拿到context，获取token设置token



export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/'
})


export default ({ store }) => {
  request.interceptors.request.use(config => {
    const defaultParams = {}
    let { user } = store.state
    if(user && user.token) config.headers.Authorization = `Token ${user.token}`
    if(config.method === 'get') {
      if(!config.params) {
        config.params = defaultParams;
      }else {
        config.params = Object.assign({}, config.params, defaultParams)
      }
    }else {
      if(!config.data) {
        config.data = defaultParams;
      }else {
        config.data = Object.assign({}, config.data, defaultParams)
      }
      config.data = qs.stringify(config.data);
    }
    
    return config
  })
  
  
  request.interceptors.response.use(response => {
    if(response.status == 200) {
      /**
       *  这里一开始返回的是response.data, 
       *  但是start时，手动刷新页面，会error，返回response就不会出现这个问题
       * 
       */
      return Promise.resolve(response);
    }else {
      return Promise.reject(response.statusText);
    }
  }, error => {
    return Promise.reject(error);
  })
}