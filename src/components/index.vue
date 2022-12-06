<!--
 * @Description: 
 * @Date: 2022-11-24 14:44:16
 * @LastEditTime: 2022-12-06 09:13:02
 * @FilePath: \vue_test\src\components\index.vue
-->
<template>
  <div style="height: 100%">
    <el-row style="height: 60px; position: relative">
      <Header @closeOrOpen="closeOrOpen" :isCollapse="isCollapse" />
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
    resize() {
      window.onresize = () => {
        if (document.body.clientWidth < 1200) {
          this.isCollapse = true;
        }
      };
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