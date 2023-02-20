<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-02-07 10:11:07
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-07 10:30:59
 * @FilePath: \yzy-2\src\pages\creditRecords\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h4 class="hear_bg">信誉度历史记录</h4>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="creditRecordId" label="记录编号">
      </el-table-column>
      <el-table-column prop="orderId" label="订单编号"> </el-table-column>
      <el-table-column prop="recordDesc" label="记录描述" width="200">
      </el-table-column>
      <el-table-column prop="oldCredit" label="原信誉分"> </el-table-column>
      <el-table-column prop="newCredit" label="变化后信誉分"> </el-table-column>
      <el-table-column prop="createTime" label="记录时间"> </el-table-column>
    </el-table>
    <div class="block pageStyle">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        :current-page.sync="pageNum"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getCreditRecordList} from "@/api/modules/creditRecords";
export default {
  data() {
    return {
      tableData: [],
      pageNum: 1,
      total: 0,
    };
  },
  methods: {
    async getCreditRecordList(pageNum) {
      pageNum && (this.pageNum = pageNum);
      let form = {
        pageNum: this.pageNum,
        userId: this.$store.state.userInfo.userInfo.id,
      };
      let result = await getCreditRecordList(form);
      if (result.code == 200) {
        this.pageNum = result.data.current;
        this.total = result.data.total;
        this.tableData = result.data.records;
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getCreditRecordList();
    },
  },
  mounted() {
    this.getCreditRecordList(1);
  },
};
</script>

<style>
</style>