/*
    要求： 能根据接口文档定义接口请求
    包含应用中所有接口请求函数的模块
    每个函数返回都是Promise
 */
import ajax from './ajax';

// 登录接口
export const reqLogin = (username,password) => ajax('/login', {username,password}, 'POST');

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');