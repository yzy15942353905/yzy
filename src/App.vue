<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2022-12-05 16:53:56
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2022-12-06 09:35:51
 * @FilePath: \yzy-2\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <div style="height: 100%">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },

  methods: {},
  mounted() {
    this.$store.dispatch("userInfo/setRoleRoutes");
    console.log(this.$route);
  },
};
</script>

<style>
#app {
  height: 100%;
}
tr > th {
  background-color: #edf6ff !important;
}
</style>
