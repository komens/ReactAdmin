/*
    能发送一部ajax请求的函数模块
    封装axios库
    函数返回值是promise对象
    1. 优化： 统一处理请求异常
              在外层包一个自己创建的promise对象
               在请求出错时不reject(value)而是自己处理异常
 */
import axios from 'axios';
import { message } from 'antd';

export default function ajax(url, data={}, type='GET') {
    return new Promise((resolve, reject) => {
        let promise;
        // 1. 执行异步ajax请求
        if(type === 'GET') {
            // 发送GET请求
            promise = axios.get(url, {
                params: data
            });
        } else {
            // 发送post请求
            promise = axios.post(url,data);
        }
        // 2.如果成功了，调用resolve
        promise.then(response => {
            // 在请求成功后返回response.data
            resolve(response.data);
        }).catch(error => {
            //3.如果失败，不调用如reject，而是提示异常信息
            // reject(error);
            message.error('请求出错了：' + error.message);
        });
    })
}
