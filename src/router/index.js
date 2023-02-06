/*
 * @Description: 
 * @Date: 2022-11-24 14:50:21
 * @LastEditTime: 2023-02-06 09:05:44
 * @FilePath: \vue_test\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from "@/utils/auth"
Vue.use(Router)
export const constantRoutes = [{
    name: "首页",
    path: "/index",
    component: () => import("@/components/Layout"),
    meta: {
        info: "首页",
        icon: "el-icon-s-home",

    },
    children: [{
        name: "首页",
        path: "/index",
        component: () => import("@/components"),
        meta: {
            icon: "el-icon-s-home", hidden: true
        },
    }
    ]
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
    path: "systems",
    redirect: '/index',
    component: () => import("@/components/Layout"),
    meta: {
        info: "系统管理", icon: "el-icon-setting"
    },
    children: [{
        name: "修改密码",
        path: "/alertPassword",
        component: () => import("@/pages/alertPassword"),
        meta: {
            info: "修改密码",

        },

    }]
},
{
    path: "personal",
    name: "个人中心",
    component: () => import("@/components/Layout"),
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
    }, {
        path: "/successHandOrder",
        name: "下单成功",
        component: () => import("@/pages/successHandOrder"),
        meta: {
            info: "下单成功",
            hidden: true,
        }
    }, {
        path: "/myCoupon",
        name: "我的优惠卷",
        component: () => import("@/pages/couponList/MyCouponList.vue"),
        meta: {
            info: "我的优惠卷",
        }
    }, {
        path: "/collection",
        name: "我的收藏",
        component: () => import("@/pages/collection"),
        meta: {
            info: "我的收藏",
        }
    }, {
        path: "/myOrderList",
        name: "我的订单",
        component: () => import("@/pages/orderList"),
        meta: {
            info: "我的订单",
        }
    }, {
        path: "/myComment",
        name: "我的评价",
        component: () => import("@/pages/CommentArea/myComment"),
        meta: {
            info: "我的评价",
        }
    }

    ]
},
{
    path: "bicycleList",
    name: "自行车租赁",
    component: () => import("@/components/Layout"),
    meta: {
        info: "自行车租赁",

    },
    children: [{
        path: "/bicycleList",
        name: "自行车租赁",
        component: () => import("@/pages/bicycleList"),
        meta: {
            info: "自行车大全",
            icon: "iconfont icon-zihangche"
        }
    }, {
        path: "/bicycleDetail",
        name: "自行车详情",
        component: () => import("@/pages/bicycleList/bicycleDetail"),
        meta: {
            info: "自行车详情",
            hidden: true,
            icon: "iconfont icon-zihangche"
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

export const asyncRoutes = [
    {
        path: "roleSystem",
        name: "权限管理",
        component: () => import("@/components/Layout"),
        meta: {
            info: "权限管理",
            icon: "el-icon-open"
        },
        children: [{
            path: "/roleSystem",
            name: "权限管理",
            component: () => import("@/pages/role"),
            meta: {
                info: "权限管理"
            }
        },],
    },
    {
        path: "userSystem",
        name: "用户管理",
        redirect: '/index',
        component: () => import("@/components/Layout"),
        meta: {
            info: "用户管理",
            icon: "el-icon-user"
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
    {
        path: "couponList",
        name: "优惠卷管理",
        redirect: '/index',
        component: () => import("@/components/Layout"),
        meta: {
            info: "优惠卷管理",
            icon: "el-icon-user"
        },
        children: [{
            path: "/couponList",
            name: "优惠卷管理",
            component: () => import("@/pages/couponList"),
            meta: {
                info: "优惠卷管理"
            }
        }],
    },
    {
        path: "orderList",
        name: "订单管理",
        redirect: '/index',
        component: () => import("@/components/Layout"),
        meta: {
            info: "订单管理",
            icon: "el-icon-user"
        },
        children: [{
            path: "/orderList",
            name: "订单管理",
            component: () => import("@/pages/orderList"),
            meta: {
                info: "订单管理"
            }
        }],
    },
    {
        path: "allComment",
        name: "评价管理",
        redirect: '/index',
        component: () => import("@/components/Layout"),
        meta: {
            info: "评价管理",
            icon: "el-icon-user"
        },
        children: [{
            path: "/allComment",
            name: "评价管理",
            component: () => import("@/pages/CommentArea/allComment"),
            meta: {
                info: "评价管理"
            }
        }],
    },

    {
        path: "bicycleList",
        name: "自行车租赁",
        component: () => import("@/components/Layout"),
        meta: {
            info: "自行车租赁",
            appendChildren: true

        },
        children: [{
            path: "/addBicycle",
            name: "新增自行车",
            component: () => import("@/pages/bicycleList/addBicycle"),
            meta: {
                info: "新增自行车",

            }
        }]


    }

]

const createRouter = () => new Router({
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        {
            y: 0
        }
    }
})
export const router = createRouter()

// 重置路由
export const resetRoute = () => {
    let newRoute = createRouter()
    router.matcher = newRoute.matcher
}

// router.beforeEach((to, from, next) => {
//     if (to.name == "登录") {
//         if (getToken()) {
//             next('/index')
//         }
//         else {
//             next()
//         }
//     } else if (to.name !== '登录' && !getToken()) next({ name: '登录', query: { redirect: to.path } })
//     else next()
// })