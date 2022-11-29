/*
 * @Description: 
 * @Date: 2022-11-24 14:50:21
 * @LastEditTime: 2022-11-28 18:51:32
 * @FilePath: \vue_test\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [{
        name: "首页",
        path: "/index",
        component: () => import("@/components"),
        meta: {
            info: "首页",
            icon: "el-icon-s-home"
        },
        children: []
    },
    {
        path: "/",
        name: "登录",
        component: () => import("@/components/Login"),
        meta: {
            hidden: true
        }
    },
    {
        path: "/register",
        name: "注册",
        component: () => import("@/components/Register"),
        meta: {
            hidden: true
        }
    },
    {
        name: "系统管理",
        path: "/systemss",
        redirect: '/index',
        component: () => import("@/components"),
        meta: {
            info: "系统管理"
        },
        children: [{
            name: "系统",
            path: "/system",
            component: () => import("@/pages/system"),
            meta: {
                info: "系统管理"
            },
            children: [

            ]

        }]
    },
    {
        path: "/personal",
        name: "个人中心",
        component: () => import("@/components"),
        meta: {
            hidden: true,
            info: "个人中心",

        },
        children: [{
            path: "/personalInfo",
            name: "个人信息",
            component: () => import("@/pages/personalInfo"),
            meta: {

                info: "个人信息",

            }
        }]
    },

    {
        path: "/404",
        name: "404",
        component: () => import("@/components/404"),
        meta: {
            hidden: true
        }
    },
    // 请务必将此路由放在最后
    // {
    //     path: '*',
    //     redirect: '/404',
    //     meta: {
    //         hidden: true
    //     }

    // }
]

export const asyncRoutes = [{
        path: "/roleSystem",
        name: "权限管理",
        redirect: '/index',
        component: () => import("@/components"),
        meta: {
            info: "权限管理"
        },
        children: [{
            path: "/role",
            name: "权限",
            component: () => import("@/pages/role"),
            meta: {
                info: "权限管理"
            }
        }],
    },
    {
        path: "/userSystem",
        name: "用户管理",
        redirect: '/index',
        component: () => import("@/components"),
        meta: {
            info: "用户管理"
        },
        children: [{
            path: "/userList",
            name: "用户列表",
            component: () => import("@/pages/userList"),
            meta: {
                info: "用户列表"
            }
        }],
    },
]

export const router = new Router({
    routes: constantRoutes

})