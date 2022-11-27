/*
 * @Description: 
 * @Date: 2022-11-25 20:33:01
 * @LastEditTime: 2022-11-27 00:27:24
 * @FilePath: \vue_test\src\store\modules\userInfo.js
 */
/*
 * @Description: 
 * @Date: 2022-11-25 20:33:01
 * @LastEditTime: 2022-11-25 21:55:23
 * @FilePath: \vue_test\src\store\modules\userInfo.js
 */
import commonUtils from '@/utils/commonUtils'
import {
    asyncRoutes,
    constantRoutes,
    router
} from '@/router'
const state = {
    // 用户信息
    userInfo: {
        userName: "张三",
        phoneNumber: "159****3905",
        address: "沈阳市皇姑区",
        sex: "男",
        personalProfile: ""
    },
    // 用户路由
    userRoutes: []
}
const mutations = {
    SETROLEROUTRES(state, userRoutes) {
        state.userRoutes = userRoutes
    },
    UPDATEUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    }

}
const actions = {
    // 设置权限路由
    setRoleRoutes({
        commit
    }) {
        let roleRoutes = commonUtils.getUserRoutes(asyncRoutes, ["权限管理"])
        let userRoutes = constantRoutes.concat(roleRoutes)
        userRoutes = userRoutes.filter((item) => {
            if (item.meta.hidden) {
                return false
            }
            return true
        })

        router.addRoutes(roleRoutes);
        commit("SETROLEROUTRES", userRoutes)

    },
    // 修改用户信息
    updateUserInfo({
        commit
    }, userInfo) {
        commit("UPDATEUSERINFO", JSON.parse(JSON.stringify(userInfo)))
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