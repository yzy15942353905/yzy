<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :class="
        isCollapse
          ? '.el-menu--collapse el-menu-vertical-demo'
          : 'el-menu-vertical-demo'
      "
      default-active="1-4-1"
      class=""
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      style="min-height: 100%; overflow: hidden"
      router
    >
      <MyMenuItem :menu-data="routes" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { routes } from "../router";
import MyMenuItem from "./MyMenuItem.vue";
export default {
  components: {
    MyMenuItem,
  },
  props: {
    isCollapse: {
      typeof: Boolean,
      default: false,
    },
  },
  data() {
    return {
      routes: routes,
    };
  },
  computed: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    console.log(routes);
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu--collapse .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse .el-submenu__icon-arrow {
  display: none;
}
</style>