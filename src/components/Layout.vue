<!--
 * @Description: 
 * @Date: 2022-11-24 14:44:16
 * @LastEditTime: 2022-12-12 13:55:31
 * @FilePath: \vue_test\src\components\index.vue
-->
<template>
  <div style="height: 100%">
    <el-row style="height: 60px; position: relative">
      <Header @closeOrOpen="closeOrOpen" :isCollapse="isCollapse" />
    </el-row>
    <div class="bottom">
      <div class="menuClass" ref="menuClass">
        <MyMenu :isCollapse="isCollapse" />
      </div>
      <el-col class="main" @scroll="mainScroll"> <AppMain /> </el-col>
    </div>
  </div>
</template>

<script>
import MyMenu from "./MyMenu.vue";
import Header from "./Header.vue";
import AppMain from "./AppMain.vue";
export default {
  components: {
    Header,
    MyMenu,
    AppMain,
  },
  data() {
    return {
      isCollapse: false,
      text: {},
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

    mainScroll() {
      console.log(111);
    },
  },
  mounted() {
    this.resize();
  },
};
</script>

<style scoped>
.main {
  flex: 1;
  height: 100%;
  min-height: 635px;
  transition: 0.5s all;
  padding: 10px;
  background-color: #eee;
  position: relative;
  overflow-x: hidden;
}
.bottom {
  height: calc(100% - 60px) !important;
  display: flex;
}
.menuClass {
  height: 100%;
  width: auto;
  transition: all 0.5;
  opacity: 1;
}
</style>