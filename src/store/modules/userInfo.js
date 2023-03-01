/*
 * @Description:
 * @Date: 2022-11-25 20:33:01
 * @LastEditTime: 2023-03-01 11:09:27
 * @FilePath: \vue_test\src\store\modules\userInfo.js
 */
import store from "@/store";
import commonUtils from "@/utils/commonUtils";
import md5 from "js-md5";
import { setToken } from "@/utils/auth";

import { Message } from "element-ui";
import { login, saveOrUpdate, register } from "@/api/modules/user.js";
import { asyncRoutes, constantRoutes, router } from "@/router";
const state = {
  // 用户信息
  userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || {},
  // 用户路由
  userRoutes: [],
};
const mutations = {
  SETROLEROUTRES(state, userRoutes) {
    state.userRoutes = userRoutes;
  },
  UPDATEUSERINFO(state, userInfo) {
    Object.assign(state.userInfo, userInfo);
  },
  CLEARUSERROUTES(state) {
    state.userRoutes = [];
  },
};
const actions = {
  // 设置权限路由
  setRoleRoutes({ commit }) {
    // ["权限管理", "用户管理", "用户列表"]
    // 后端还没配置 store.state.userInfo.userInfo.asyncRoutes
    // if (store.state.userInfo.userRoutes.length != 0) {
    //   return;
    // }

    let roleMenu = store.state.userInfo.userInfo.roleMenu
      ? store.state.userInfo.userInfo.roleMenu.split(",")
      : [];

    for (let index = 0; index < roleMenu.length; index++) {
      roleMenu[index] = Number(roleMenu[index]);
    }
    let getRouters = roleMenu;

    let roleRoutes = commonUtils.getUserRoutes(asyncRoutes, getRouters);
    console.log("roleRoutes", roleRoutes);
    let userRoutes = constantRoutes.concat(roleRoutes);
    console.log("   userRoutes: ", userRoutes);
    // userRoutes = userRoutesFilter(userRoutes)
    roleRoutes.forEach((roleRoute) => {
      router.addRoute(roleRoute);
    });

    // setTimeout(() => {
    //     userRoutes = userRoutesFilter(userRoutes)
    // }, 0);

    router.addRoute({
      path: "*",
      redirect: "/404",
      meta: {
        hidden: true,
      },
    });

    commit("SETROLEROUTRES", userRoutes);
  },
  // 修改用户信息
  async updateUserInfo({ commit }, userInfo) {
    // console.log(userInfo);
    let userForm = commonUtils.deepCopy(userInfo);
    userForm.phone = undefined;
    let result = await saveOrUpdate(userForm);
    if (result.code == 200) {
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      commit("UPDATEUSERINFO", JSON.parse(JSON.stringify(userInfo)));
      Message.success(result.msg);
    } else {
      Message.error(result.msg);
    }
  },
  // 登录
  async login({ commit }, userInfo) {
    let form = JSON.parse(JSON.stringify(userInfo));

    // !userInfo.type && (form.password = md5(form.password))
    let result = await login(form);
    if (result.code != 200) {
      Message.error(result.msg);
      return false;
    } else {
      setToken(result.data.token);
      result.data.token = undefined;
      sessionStorage.setItem("userInfo", JSON.stringify(result.data));
      commit("UPDATEUSERINFO", result.data);
      store.dispatch("userInfo/setRoleRoutes");
      return true;
    }
  },
  // 注册
  async register({ commit }, userInfo) {
    // console.log(this.$store);
    let form = JSON.parse(JSON.stringify(userInfo));
    // md5加密
    // form.password = md5(form.password)

    let result = await register(form);
    if (result.code == 200) {
      return store.dispatch("userInfo/login", {
        type: "register",
        phone: userInfo.phone,
        password: userInfo.password,
      });
    }
    {
      Message.error(result.msg);
      return false;
    }
  },
  clearUserRoutes({ commit }) {
    commit("CLEARUSERROUTES");
  },
};
const getter = {};

const userRoutesFilter = (userRoutes) => {
  return userRoutes.filter((item) => {
    if (item.meta.hidden) {
      return false;
    }
    if (item.children && item.children.lenght != 0)
      item.children = userRoutesFilter(item.children);
    return true;
  });
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getter,
};
