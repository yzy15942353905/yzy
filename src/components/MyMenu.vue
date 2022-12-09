<!--
 * @Description: 
 * @Date: 2022-11-25 09:13:04
 * @LastEditTime: 2022-12-09 09:48:27
 * @FilePath: \vue_test\src\components\MyMenu.vue
-->
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :class="
        isCollapse
          ? '.el-menu--collapse el-menu-vertical-demo'
          : 'el-menu-vertical-demo'
      "
      :default-active="$route.path"
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

  computed: {
    routes() {
      return this.$store.state.userInfo.userRoutes;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
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