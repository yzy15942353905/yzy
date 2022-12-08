/*
 * @Description: 
 * @Date: 2022-11-10 14:29:28
 * @LastEditTime: 2022-12-08 16:33:02
 * @FilePath: \vue_test\src\api\request.js
 */
import axios from 'axios'
import { getToken } from "@/utils/auth"
import store from '@/store'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
let request = new axios.create({
    baseURL: "/api",
    timeout: 5000,
})
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    //启动进度条
    nprogress.start()
    // 设置token
    getToken() && (config.headers["token"] = getToken())
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //结束进度条
    nprogress.done();
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default request