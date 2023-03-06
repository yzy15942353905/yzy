/*
 * @Description:
 * @Date: 2022-11-24 14:50:21
 * @LastEditTime: 2023-03-03 09:25:09
 * @FilePath: \vue_test\src\router\index.js
 */
import Vue from "vue";
import Router from "vue-router";
import { getToken } from "@/utils/auth";
Vue.use(Router);
export const constantRoutes = [
  {
    name: "首页❀",
    path: "/index",
    component: () => import("@/components/Layout"),
    meta: {
      info: "首页",
      icon: "el-icon-s-home",
      hidden: true,
    },
    children: [
      {
        name: "首页",
        path: "/index",
        component: () => import("@/components"),
        meta: {
          info: "自行车在线租赁系统",
          icon: "el-icon-s-home",
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/",
    name: "登录",
    component: () => import("@/components/Login"),
    meta: {
      hidden: true,
      info:"登录"
    },
  },
  {
    path: "/register",
    name: "注册",
    component: () => import("@/components/Register"),
    meta: {
      hidden: true,
      info:"注册"
    },
  },
  {
    name: "系统管理#",
    path: "/systems#",
    redirect: "/index",
    component: () => import("@/components/Layout"),
    meta: {
      info: "系统管理",
      icon: "el-icon-setting",
    },
    children: [
      {
        name: "修改密码",
        path: "/alertPassword",
        component: () => import("@/pages/alertPassword"),
        meta: {
          info: "修改密码",
        },
      },
    ],
  },
  {
    path: "/personal#",
    name: "个人中心#",
    component: () => import("@/components/Layout"),
    meta: {
      hidden: true,
      info: "个人中心",
    },
    children: [
      {
        path: "/personalInfo",
        name: "个人信息",
        component: () => import("@/pages/personalInfo"),
        meta: {
          info: "个人信息",
          hidden: true,
        },
      },
      {
        path: "/successHandOrder",
        name: "下单成功",
        component: () => import("@/pages/successHandOrder"),
        meta: {
          info: "下单成功",
          hidden: true,
        },
      },
      {
        path: "/myCoupon",
        name: "我的优惠卷",
        component: () => import("@/pages/couponList/MyCouponList.vue"),
        meta: {
          info: "我的优惠卷",
          hidden: true,
        },
      },
      {
        path: "/collection",
        name: "我的收藏",
        component: () => import("@/pages/collection"),
        meta: {
          info: "我的收藏",
          hidden: true,
        },
      },
      {
        path: "/myOrderList",
        name: "我的订单",
        component: () => import("@/pages/orderList/myOrder.vue"),
        meta: {
          info: "我的订单",
          hidden: true,
        },
      },
      {
        path: "/myComment",
        name: "我的评价",
        component: () => import("@/pages/CommentArea/myComment"),
        meta: {
          info: "我的评价",
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/bicycleList#",
    name: "自行车租赁#",
    component: () => import("@/components/Layout"),
    meta: {
      info: "自行车租赁",
    },
    children: [
      {
        path: "/bicycleList",
        name: "自行车租赁",
        component: () => import("@/pages/bicycleList"),
        meta: {
          info: "自行车大全",
          icon: "iconfont icon-zihangche",
        },
      },
      {
        path: "/bicycleDetail",
        name: "自行车详情",
        component: () => import("@/pages/bicycleList/bicycleDetail"),
        meta: {
          info: "自行车详情",
          hidden: true,
          icon: "iconfont icon-zihangche",
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/404"),
    meta: {
      hidden: true,
    },
  },
  // 请务必将此路由放在最后
  // {
  //     path: '*',
  //     redirect: '/404',
  //     meta: {
  //         hidden: true
  //     }

  // }
];
export const asyncRoutes = () => [
  {
    id: 1,
    path: "/roleSystem#",
    name: "权限管理#",
    component: () => import("@/components/Layout"),
    meta: {
      info: "权限管理",
      icon: "el-icon-open",
    },
    children: [
      {
        id: 2,
        path: "/roleSystem",
        name: "权限管理",
        component: () => import("@/pages/role"),
        meta: {
          info: "权限管理",
        },
      },
      {
        id: 3,
        path: "/addRole",
        name: "新增权限",
        component: () => import("@/pages/role/addRole"),
        meta: {
          info: "新增权限",
        },
      },
      {
        id: 4,
        path: "/userRole",
        name: "用户角色管理",
        component: () => import("@/pages/role/userRole"),
        meta: {
          info: "用户角色管理",
        },
      },
    ],
  },
  {
    id: 5,
    path: "/userSystem#",
    name: "用户管理#",
    redirect: "/index",
    component: () => import("@/components/Layout"),
    meta: {
      info: "用户管理",
      icon: "el-icon-user",
    },
    children: [
      {
        id: 6,
        path: "/userList",
        name: "用户列表",
        component: () => import("@/pages/userList"),
        meta: {
          info: "用户列表",
        },
      },
    ],
  },
  {
    id: 7,
    path: "/couponList#",
    name: "优惠卷管理#",
    redirect: "/index",
    component: () => import("@/components/Layout"),
    meta: {
      info: "优惠卷管理",
      icon: "el-icon-user",
    },
    children: [
      {
        id: 8,
        path: "/couponList",
        name: "优惠卷管理",
        component: () => import("@/pages/couponList"),
        meta: {
          info: "优惠卷管理",
        },
      },
      {
        id: 9,
        path: "/addCoupon",
        name: "新增优惠卷",
        component: () => import("@/pages/couponList/addCoupon"),
        meta: {
          info: "新增优惠卷",
        },
      },
    ],
  },
  {
    id: 10,
    path: "/orderList#",
    name: "订单管理#",
    redirect: "/index",
    component: () => import("@/components/Layout"),
    meta: {
      info: "订单管理",
      icon: "el-icon-user",
    },
    children: [
      {
        id: 11,
        path: "/orderList",
        name: "订单管理",
        component: () => import("@/pages/orderList"),
        meta: {
          info: "订单管理",
        },
      },
    ],
  },
  {
    id: 12,
    path: "/allComment#",
    name: "评价管理#",
    redirect: "/index",
    component: () => import("@/components/Layout"),
    meta: {
      info: "评价管理",
      icon: "el-icon-user",
    },
    children: [
      {
        id: 13,
        path: "/allComment",
        name: "评价管理",
        component: () => import("@/pages/CommentArea/allComment"),
        meta: {
          info: "评价管理",
        },
      },
    ],
  },

  {
    id: 14,
    path: "/bicycleManage#",
    name: "自行车管理#",
    component: () => import("@/components/Layout"),
    meta: {
      info: "自行车管理",
    },
    children: [
      {
        id: 15,
        path: "/bicycleManage",
        name: "自行车管理",
        component: () => import("@/pages/bicycleList/bicycleManage"),
        meta: {
          info: "自行车管理",
        },
      },
      {
        id: 16,
        path: "/addBicycle",
        name: "新增自行车",
        component: () => import("@/pages/bicycleList/addBicycle"),
        meta: {
          info: "新增自行车",
        },
      },
    ],
  },
  {
    id: 17,
    path: "/applyRefundManage#",
    name: "退款订单管理#",
    component: () => import("@/components/Layout"),
    meta: {
      info: "退款订单管理",
    },
    children: [
      {
        id: 18,
        path: "/applyRefundManage",
        name: "退款订单管理",
        component: () => import("@/pages/orderList/applyRefundOrder"),
        meta: {
          info: "退款订单管理",
        },
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    routes: constantRoutes,
    scrollBehavior: () => ({
      y: 0,
    }),
  });
export const router = createRouter();

// 重置路由
export const resetRoute = () => {
  let newRoute = createRouter();
  router.matcher = newRoute.matcher;
};

router.beforeEach((to, from, next) => {
  if (to.name == "登录") {
    if (getToken()) {
      next("/index");
    } else {
      next();
    }
  }
  // 根据路由设置标题
  to.meta.info && (document.title = to.meta.info);
  next();
});
