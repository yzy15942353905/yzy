<!--
 * @Description: 
 * @Date: 2022-11-24 14:44:16
 * @LastEditTime: 2022-12-14 14:34:44
 * @FilePath: \vue_test\src\components\index.vue
-->
<template>
  <div style="height: 100%">
    <el-row style="height: 60px; position: relative">
      <Header @closeOrOpen="closeOrOpen" :isCollapse="isCollapse" />
    </el-row>
    <div class="bottom">
      <div class="menuClass" ref="menuClass" @mouseenter="MenuEnterEvent">
        <el-scrollbar
          style="width: 100%; height: 100%"
          wrap-style="overflow-x:hidden;"
        >
          <MyMenu :isCollapse="isCollapse" />
        </el-scrollbar>
      </div>

      <el-scrollbar
        style="width: 100%; height: 100%"
        wrap-style="overflow-x:hidden;"
      >
        <div class="main" @scroll="mainScroll">
          <AppMain /></div
      ></el-scrollbar>
    </div>
  </div>
</template>

<script>
import MyMenu from "./MyMenu.vue";
import Header from "./Header.vue";
import AppMain from "./AppMain.vue";
import _ from "lodash";
export default {
  components: {
    Header,
    MyMenu,
    AppMain,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    closeOrOpen() {
      this.isCollapse = !this.isCollapse;
    },
    // 监控屏幕width  控制菜单伸缩
    resize() {
      window.onresize = () => {
        if (document.body.clientWidth < 1200) {
          this.isCollapse = true;
        }
      };
    },

    mainScroll: _.throttle(function () {
      this.$refs["menuClass"].style.opacity = 0.5;
      this.$refs["menuClass"].style["transition-duration"] = "3s";
    }, 500),
    MenuEnterEvent() {
      this.$refs["menuClass"].style.opacity == 0.5 &&
        ((this.$refs["menuClass"].style.opacity = 1),
        (this.$refs["menuClass"].style["transition-duration"] = "0.1s"));
    },
  },
  mounted() {
    this.resize();
    // this.$refs["mainArea"].addEventListener("scroll", this.mainScroll);
  },
};
</script>

<style scoped>
.main {
  flex: 1;
  height: calc(100% - 60px);
  min-height: 665px;
  transition: 0.5s all;
  padding: 10px;
  background-color: #eee;
  position: relative;
  overflow-x: hidden !important;
}
.bottom {
  height: calc(100% - 60px) !important;
  display: flex;
  min-height: 665px;
}
.menuClass {
  height: 100%;

  width: auto;
  transition: opacity;
  opacity: 1;
}
/* element滚动条组件 隐藏水平滚动条 */
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>