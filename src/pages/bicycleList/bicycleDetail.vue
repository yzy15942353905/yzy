<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-18 15:52:06
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-01-18 16:13:14
 * @FilePath: \yzy-2\src\pages\bicycleList\bicycleDetail.vue
 * @Description: 自行车详情页
-->
<template>
  <div></div>
</template>

<script>
import { getById } from "@/api/modules/bicycle.js";
export default {
  data() {
    return {
      bicycleId: undefined,
    };
  },
  methods: {
    async getById(bicycleId) {
      let result = await getById(bicycleId);
      if (result.code == 200) {
      }
    },
  },
  mounted() {
    this.bicycleId = this.$route.query.bicycleId;
    this.getById(this.bicycleId);
  },
};
</script>

<style>
</style>