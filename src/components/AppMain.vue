<!--
 * @Description: 
 * @Date: 2022-11-28 15:24:06
 * @LastEditTime: 2023-01-18 10:42:51
 * @FilePath: \vue_test\src\components\AppMain.vue
-->
<template>
  <div
    style="
      padding: 15px;
      box-sizing: border-box;
      min-height: 666px;
    "
  >
    <TagList />

    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import TagList from "./TagList.vue";
export default {
  components: {
    TagList,
  },
};
</script>

<style>
</style>