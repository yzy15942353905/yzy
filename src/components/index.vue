<!--
 * @Description: 
 * @Date: 2022-11-24 14:44:16
 * @LastEditTime: 2022-11-28 15:31:16
 * @FilePath: \vue_test\src\components\index.vue
-->
<!--
 * @Description: 
 * @Date: 2022-11-24 14:44:16
 * @LastEditTime: 2022-11-27 15:48:54
 * @FilePath: \vue_test\src\components\index.vue
-->
<template>
  <div style="height: 100%">
    <el-row style="height: 60px; position: relative">
      <Header @closeOrOpen="closeOrOpen" />
    </el-row>
    <div class="bottom">
      <div style="height: 100%; width: auto">
        <MyMenu :isCollapse="isCollapse" />
      </div>
      <el-col class="main"> <AppMain /> </el-col>
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
      meunSpan: 4,
      isCollapse: false,
      text: {},
    };
  },
  methods: {
    closeOrOpen() {
      this.isCollapse = !this.isCollapse;
      this.meunSpan = this.isCollapse ? 1 : 4;
    },
  },
};
</script>

<style scoped>
.main {
  flex: 1;
  height: 100%;
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
</style>