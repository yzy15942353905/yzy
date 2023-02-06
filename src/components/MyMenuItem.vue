<!--
 * @Description: 
 * @Date: 2022-11-25 09:15:51
 * @LastEditTime: 2022-12-14 16:19:53
 * @FilePath: \vue_test\src\components\MyMenuItem.vue
-->
<template>
  <fragment>
    <template v-for="item in menuData">
      <el-submenu
        :index="item.path"
        :key="item.path"
        v-if="item.children && item.children.length > 0"
      >
        <template slot="title">
          <i :class="item.meta.icon || 'el-icon-warning-outline'"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <MyMenuItem :menu-data="item.children" />
      </el-submenu>

      <el-menu-item v-else :index="item.path" :key="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </template>
  </fragment>
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