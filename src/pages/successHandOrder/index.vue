<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-28 16:44:20
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-02 16:54:17
 * @FilePath: \yzy-2\src\pages\successHandOrder\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-row class="row">
      <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="toMyOrder"
            >查看我的订单</el-button
          >
        </template>
      </el-result>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    toMyOrder() {
      this.$router.replace({ path: "/myOrderList", query: { flag: 1 } });
    },
  },
};
</script>

<style>
.row {
  width: 200px;
  margin: 100px auto;
}
</style>