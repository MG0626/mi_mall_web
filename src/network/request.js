import axios from 'axios';
// vuex
import store from '../store';

const http = axios.create({
  baseURL: 'http://127.0.0.1:4001',
  timeout: 5000
});

// 请求拦截器
http.interceptors.request.use(config => {
  // 请求头添加token
  config.headers.Authorization = 'Bearer ' + store.state.token;
  return config;
});

// 响应拦截器
http.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return err.response;
  }
);

export default http;