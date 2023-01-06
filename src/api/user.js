/*
 * @Description: 
 * @Date: 2022-11-10 14:35:12
 * @LastEditTime: 2023-01-05 16:31:34
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

// 分页查询
export const findPage = (params) => {
    return request({
        url: "/user/page",
        method: "get",
        params
    })
}

// 修改密码
export const alertPassword = (data) => {
    return request({
        url: "/user/alertPassword",
        method: "post",
        data
    })
}