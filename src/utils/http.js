/**
 * Created by scott on 2019-03-14
 */

import Axios from 'axios'
import {ArrangeParams} from './public'
// import qs from 'querystring'
Axios.defaults.timeout = 20000
Axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
Axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization") + ''
export const rootUrl = process.env.NODE_ENV == 'development' ? window.location.origin + '/api' : window.location.origin + '/hbapi'
Axios.defaults.baseURL = rootUrl

Axios.interceptors.response.use(function (res) {
  return res
}, function (err) {
  if (parseInt(err.response.status) === 401) {
    // error
  }
  return Promise.reject(err)
})


/**
 * 设置Axios默认header
 * @param key
 * @param value
 */
export function SetDefaultHeader(key, value) {
  Axios.defaults.headers[key] = value
}


export default {
  httpGet(url, params) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {params: ArrangeParams(params)}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  httpPost(url, params) {
    return new Promise((resolve, reject) => {
      Axios.post(url, ArrangeParams(params)).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  httpPut(url, params) {
    return new Promise((resolve, reject) => {
      Axios.put(url, ArrangeParams(params)).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  httpDelete(url, params) {
    return new Promise((resolve, reject) => {
      Axios.delete(url, {params: ArrangeParams(params)}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  httpAuth(url, auth) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {auth: auth}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
