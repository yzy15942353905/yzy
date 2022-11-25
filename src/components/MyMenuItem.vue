<template>
  <div>
    <template v-for="item in menuData">
      <el-submenu
        :index="item.path"
        :key="item.path"
        v-if="item.children && item.children.length > 0"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <MyMenuItem :menu-data="item.children" />
      </el-submenu>

      <el-menu-item v-else :index="item.path" :key="item.path">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "MyMenuItem",
  props: {
    menuData: {
      typeof: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style>
</style>