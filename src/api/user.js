/*
 * @Description: 
 * @Date: 2022-11-10 14:35:12
 * @LastEditTime: 2023-01-06 14:26:16
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

// 根据用户id查询用户详细信息
export const getById = (id) => {
    return request({
        url: `/user/${id}`,
        method: "get",
    })
}

// 根据用户id删除用户
export const deleteById = (id) => {
    return request({
        url: `/user/del/${id}`,
        method: "post",
    })
}