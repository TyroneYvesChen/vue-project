import axios from 'axios'
import store from '../../../store/store'
import storage from '../storage'
import * as types from './config'


var qs = require('qs')

//超时拦截/报错 根据返回值判断/请求失败了 是否再次请求/超过5次 自动断掉


const baseURL = ""

let CancelToken = axios.CancelToken,
    source = CancelToken.source()


let httpServer = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/form-data'
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json'
  },
  transformRequest: [function (data) {
    // return qs.stringify(data);
    return data;
  }],
  transformResponse: [function (data) {
    return data;
  }],
  cancelToken: source.token
});

httpServer.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //需要在头部加一对键值{router:xxx}与对应router键值相同

  let params = config.data

  config.headers.router = params.router

  //判断session中是否存在token，id等，并加在对应位置。
  let token = storage.session.get(types.TOKEN_KEY),
    id = storage.session.get(types.ONLY_ID)

  token && (params[types.TOKEN_KEY] = token)
  id && (params[types.ONLY_ID] = id)

  config.method  === 'post' && (params = qs.stringify(params))

  config.data = params
  //记录请求数
  store.dispatch("httpCounts",true)

  return config;
}, function (error) {
  // 对请求错误做些什么
  store.dispatch("httpCounts",false)
  return Promise.reject(error);
});

// 添加响应拦截器
httpServer.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  let data = JSON.parse(response.data),
    token = data[types.TOKEN_KEY],
    id = data[types.ONLY_ID]

  token && storage.session.set(types.TOKEN_KEY, token)
  id && storage.session.set(types.ONLY_ID, id)

  response.data = data

  store.dispatch("httpCounts",false)

  return response;
}, function (error) {
  // 返回状态码不为200时候的错误处理

  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break

      case 401:
        error.message = '未授权，请登录'
        break

      case 403:
        error.message = '拒绝访问'
        break

      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break

      case 408:
        error.message = '请求超时'
        break

      case 500:
        error.message = '服务器内部错误'
        break

      case 501:
        error.message = '服务未实现'
        break

      case 502:
        error.message = '网关错误'
        break

      case 503:
        error.message = '服务不可用'
        break

      case 504:
        error.message = '网关超时'
        break

      case 505:
        error.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  store.dispatch("httpCounts",false)
  return Promise.reject(error);
});



export default httpServer