/*
 * @Description: 
 * @Date: 2022-11-25 20:33:01
 * @LastEditTime: 2022-12-07 16:28:18
 * @FilePath: \vue_test\src\store\modules\userInfo.js
 */
import store from "@/store"
import commonUtils from '@/utils/commonUtils'
import {
    setToken
} from '@/utils/auth'

import {
    Message
} from 'element-ui';
import {
    login,
    saveOrUpdate,
    register
} from "@/api/user.js"
import {
    asyncRoutes,
    constantRoutes,
    router
} from '@/router'
const state = {
    // 用户信息
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
    // 用户路由
    userRoutes: []
}
const mutations = {
    SETROLEROUTRES(state, userRoutes) {
        state.userRoutes = userRoutes
    },
    UPDATEUSERINFO(state, userInfo) {
        Object.assign(state.userInfo, userInfo)
    }

}
const actions = {
    // 设置权限路由
    setRoleRoutes({
        commit
    }) {
        // ["权限管理", "用户管理", "用户列表"]
        // 后端还没配置 store.state.userInfo.userInfo.asyncRoutes
        let roleRoutes = commonUtils.getUserRoutes(asyncRoutes, ["权限管理", "用户管理", "用户列表"])
        let userRoutes = constantRoutes.concat(roleRoutes)
        userRoutes = userRoutes.filter((item) => {
            if (item.meta.hidden) {
                return false
            }
            return true
        })
        roleRoutes.forEach(roleRoute => {
            router.addRoute(roleRoute);
        });

        router.addRoute({
            path: '*',
            redirect: '/404',
            meta: {
                hidden: true
            }

        })
        commit("SETROLEROUTRES", userRoutes)

    },
    // 修改用户信息
    async updateUserInfo({
        commit
    }, userInfo) {

        let userForm = commonUtils.deepCopy(userInfo)
        userForm.phone = undefined
        let result = await saveOrUpdate(userForm)
        if (result.code == 200) {
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
            commit("UPDATEUSERINFO", JSON.parse(JSON.stringify(userInfo)))
            Message.success(result.msg)
        } else {
            Message.error(result.msg)
        }

    },
    // 登录
    async login({
        commit
    }, userInfo) {
        console.log(store.state);
        let result = await login(userInfo)
        if (result.code != 200) {
            Message.error(result.msg)
            return false
        } else {
            setToken(result.data.token)
            result.data.token = undefined
            sessionStorage.setItem("userInfo", JSON.stringify(result.data))
            commit("UPDATEUSERINFO", result.data)
            return true
        }
    },
    // 注册
    async register({
        commit
    }, userInfo) {
        console.log(this.$store);
        let result = await register(userInfo)
        if (result.code == 200) {
            return store.dispatch("userInfo/login", {
                username: userInfo.phone,
                password: userInfo.password
            })
        } {
            Message.error(result.msg)
            return false
        }
    }
}
const getter = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getter
}