import axios from 'axios'
import qs from 'qs'
import Cookie from 'js-cookie'

 const instance = axios.create({
  baseURL: 'https://conduit.productionready.io/'
})

instance.interceptors.request.use(config => {
  const defaultParams = {}
  config.headers.Authorization = `Token `
  // defaultParams.token = getToken();
  if(config.method === 'get') {
    if(!config.params) {
      config.params = defaultParams;
    }else {
      config.params = Object.assign({}, config.params, defaultParams)
    }
  }else if(config.method = 'post') {
    if(!config.data) {
      config.data = defaultParams;
    }else {
      config.data = Object.assign({}, config.data, defaultParams)
    }
    config.data = qs.stringify(config.data);
  }
  
  return config
})


instance.interceptors.response.use(response => {
  if(response.status == 200) {
    return Promise.resolve(response.data);
  }else {
    return Promise.reject(response.statusText);
  }
}, error => {
  return Promise.reject(error);
})

export default function request(config) {
  return instance(config)
}