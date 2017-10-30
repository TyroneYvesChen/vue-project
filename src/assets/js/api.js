import axios from 'axios'

const baseURL = ""

let CancelToken = axios.CancelToken,
    source = CancelToken.source()

let httpServer = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    console.log(data, "data")
    return data;
  }],
  transformResponse: [function (data) {
    return data;
  }],
  cancelToken: source.token
});

httpServer.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
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
