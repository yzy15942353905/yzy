<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-13 11:08:19
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-01 15:49:29
 * @FilePath: \yzy-2\src\pages\collection\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h4 class="hear_bg">收藏列表</h4>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="bicycleId" label="自行车编号" width="80">
      </el-table-column>
      <el-table-column prop="bicycleName" label="自行车名称"> </el-table-column>
      <el-table-column prop="bicycleType" label="自行车类型" width="80">
      </el-table-column>
      <el-table-column prop="address" label="所属地区" width="80">
      </el-table-column>
      <el-table-column prop="priceHour" label="时价" width="300">
      </el-table-column>
      <el-table-column prop="priceDate" label="日价" width="80">
      </el-table-column>
      <el-table-column prop="priceMonth" label="月价" width="80">
      </el-table-column>

      <el-table-column prop="bicycleDesc" label="自行车描述" width="180">
      </el-table-column>
      <el-table-column prop="isDama" label="是否损坏" width="180">
      </el-table-column>
      <el-table-column prop="status" label="当前状态" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            @click="lookdDetail(scope.row.bicycleId)"
            class="viewBtn"
            type="text"
            icon="el-icon-view"
            >查看详情</el-button
          >
          <el-button
            @click="collectionOrCancel(scope.row.bicycleId)"
            type="text"
            class="deleteBtn"
            icon="el-icon-delete"
            >取消收藏</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPage, cancelCollection } from "@/api/modules/collection";
export default {
  data() {
    return {
      form: {},
      rules: {},
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    lookdDetail(id) {},
    deleteById(id) {},
    async getList(pageNum) {
      pageNum && (this.form.pageNum = pageNum);
      this.form.pageSize = this.pageSize;
      this.form.userId = this.$store.state.userInfo.userInfo.id;
      let result = await getPage(this.form);
      if (result.code == 200) {
        if (
          result.data == null ||
          result.data.records == null ||
          result.data.records.length == 0
        ) {
          this.$message({
            type: "warning",
            message: "您查询的结果不存在！",
          });
          this.tableData = [];
          this.total = 0;
        } else {
          this.tableData = result.data.records;
          this.total = result.data.total;
        }
      }
    },
    // 收藏与取消收藏
    collectionOrCancel: _.throttle(async function (bicycleId) {
      let data = {
        bicycleId: bicycleId,
        userId: this.$store.state.userInfo.userInfo.id,
      };

      // 已经收藏，点击取消收藏
      let result = await cancelCollection(data);
      if (result.code == 200) {
        this.getList();
        this.$message.success(result.msg);
      } else {
        this.$message.error(result.msg);
      }
    }, 1000),
  },
  mounted() {
    this.getList(1);
  },
};
</script>

<style>
</style>