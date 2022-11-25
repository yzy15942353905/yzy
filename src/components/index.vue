<template>
  <div style="height: 100%">
    <el-row style="height: 60px; position: relative">
      <Header @closeOrOpen="closeOrOpen" />
    </el-row>
    <div class="bottom">
      <div style="height: 100%; width: auto">
        <MyMenu :isCollapse="isCollapse" />
      </div>
      <el-col class="main">
        <div style="padding: 10px; background-color: #f8f8f8; min-height: 96%">
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
import MyMenu from "./MyMenu.vue";
import Header from "./Header.vue";
export default {
  components: {
    Header,
    MyMenu,
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
  overflow-y: scroll;
}
.bottom {
  height: calc(100% - 60px) !important;
  display: flex;
}
</style>