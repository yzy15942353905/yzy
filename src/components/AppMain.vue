<!--
 * @Description: 
 * @Date: 2022-11-28 15:24:06
 * @LastEditTime: 2022-12-06 10:18:45
 * @FilePath: \vue_test\src\components\AppMain.vue
-->
<template>
  <div
    style="
      padding: 15px;
      background-color: #fdfdfd;
      box-sizing: border-box;
      min-height: calc(100%);
    "
  >
    <TagList />
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import TagList from "./TagList";
export default {
  components: {
    TagList,
  },
};
</script>

<style>
</style>