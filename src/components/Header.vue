<!--
 * @Description: 
 * @Date: 2022-11-24 16:08:18
 * @LastEditTime: 2022-12-06 09:11:53
 * @FilePath: \vue_test\src\components\Header.vue
-->
<template>
  <div class="header">
    <div class="headerLeft">
      <div
        style="width: 200px; height: 100%; background-color: skyblue"
        @click="$router.push('/index')"
      ></div>
      <div class="openOrclose">
        <i
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="closeOrOpen"
        ></i>
      </div>

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="breadCrumbItem in breadCrumbList"
          :key="breadCrumbItem.path"
        >
          {{ breadCrumbItem.meta.info }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div style="padding: 0 50px">
        <i class="el-icon-time" style="font-size: 20px"></i>{{ curTime }}
      </div>
    </div>
    <div style="display: flex; align-items: center">
      <div class="avatar">
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="demo-basic--circle">
              <el-avatar
                :src="userInfo.avatarUrl"
                icon="el-icon-user-solid"
              ></el-avatar>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push('personalInfo')"
              ><span>个人中心</span></el-dropdown-item
            >
            <el-dropdown-item><span>我的购物车</span></el-dropdown-item>
            <el-dropdown-item><span>我的订单</span></el-dropdown-item>
            <el-dropdown-item><span>我的收藏</span></el-dropdown-item>

            <el-dropdown-item divided @click.native="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="padding: 0 50px 0 10px">
        <span>{{ userInfo.nickName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["isCollapse"],

  data() {
    return {
      curTime: "当前时间",
    };
  },
  methods: {
    // 导航栏展示与隐藏按钮
    closeOrOpen() {
      this.$emit("closeOrOpen");
    },
    // 退出登录
    logout() {
      // 清除token 个人信息...
      this.$router.replace("/");
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo.userInfo;
    },
    breadCrumbList() {
      return this.$route.matched;
    },
  },
  mounted() {
    setInterval(() => {
      this.curTime = this.$commonUtils.getTime({ sfm: true, week: true });
    }, 1000);
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.headerLeft {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.header .openOrclose {
  padding: 0 50px;
}
.header .openOrclose i {
  font-size: 30px;
}
.avatar {
  padding: 0 10px;
}
</style>
