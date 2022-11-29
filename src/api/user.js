/*
 * @Description: 
 * @Date: 2022-11-10 14:35:12
 * @LastEditTime: 2022-11-28 22:14:00
 * @FilePath: \vue_test\src\api\user.js
 */
import request from './request'

export const login = (data) => {

    return request({
        url: "/user/login",
        method: "post",
        data
    })
}
// 更新或注册
export const saveOrUpdate = (data) => {

    return request({
        url: "/user",
        method: "post",
        data
    })
}

// 注册
export const register = (data) => {

    return request({
        url: "/user/register",
        method: "post",
        data
    })
}