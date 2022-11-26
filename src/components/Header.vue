<!--
 * @Description: 
 * @Date: 2022-11-24 16:08:18
 * @LastEditTime: 2022-11-26 16:54:02
 * @FilePath: \vue_test\src\components\Header.vue
-->
<template>
  <div class="header">
    <div class="headerLeft">
      <div style="width: 200px; height: 100%; background-color: skyblue"></div>
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
          :to="breadCrumbItem.path"
        >
          {{ breadCrumbItem.meta.info }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div style="padding: 0 50px">
        {{ curTime }}
      </div>
    </div>
    <div style="display: flex; align-items: center">
      <div class="avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <div style="padding: 0 50px 0 10px">
        <span>{{ userInfo.userName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isCollapse: false,
      curTime: "当前时间",
    };
  },
  methods: {
    closeOrOpen() {
      this.isCollapse = !this.isCollapse;
      this.$emit("closeOrOpen");
    },
  },
  computed: {
    breadCrumbList() {
      return this.$route.matched;
    },
    userInfo() {
      return this.$store.state.userInfo.userInfo;
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
  padding: 50px;
}
.header .openOrclose i {
  font-size: 30px;
}
.avatar {
  padding: 0 10px;
}
</style>
