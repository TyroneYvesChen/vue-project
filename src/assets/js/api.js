import axios from 'axios'
var qs = require('qs')

//超时拦截/报错 根据返回值判断/请求失败了 是否再次请求/超过5次 自动断掉



const baseURL = ""

let CancelToken = axios.CancelToken,
    source = CancelToken.source()


let httpServer = axios.create({
  baseURL: baseURL,
  timeout: 5000,
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
  config.headers.router = config.data.router

  config.data = qs.stringify(config.data)

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpServer.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



export default httpServer
