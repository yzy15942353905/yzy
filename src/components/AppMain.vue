<!--
 * @Description: 
 * @Date: 2022-11-28 15:24:06
 * @LastEditTime: 2022-11-28 16:11:35
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
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>