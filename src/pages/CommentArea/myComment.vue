<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-29 10:51:30
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-06 09:50:57
 * @FilePath: \yzy-2\src\pages\couponList\index.vue
 * @Description: 评价管理（admin）
-->

<template>
  <div>
    <h4 class="hear_bg">评价查询</h4>
    <el-form
      label-width="100px"
      :model="form"
      ref="form"
      :rules="rules"
      class="formstyle"
    >
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item prop="commentId" label="评价编号">
            <el-input
              placeholder="评价编号"
              v-model.trim="form.commentId"
              clearable
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row justify="center" type="flex" class="mt10">
        <el-button
          size="small"
          icon="el-icon-search"
          type="primary"
          @click="getAllComment(1)"
          >查 询</el-button
        >
      </el-row>
    </el-form>
    <h4 class="hear_bg">评价列表</h4>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      stripe
      :cell-style="setRowStyle"
    >
      <el-table-column prop="commentId" label="评价id" width="80">
      </el-table-column>
      <el-table-column prop="bicycleId" label="自行车id" width="100">
      </el-table-column>
      <el-table-column prop="bicycleName" label="自行车名称" width="150">
      </el-table-column>
      <el-table-column prop="commentContent" label="评价内容" width="300">
      </el-table-column>
      <el-table-column prop="star" label="评分" width="80"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column
        prop="isBan"
        label="评论状态"
        width="80"
        class="redStatus"
        :formatter="getCommentStatus"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            @click="lookOrder(scope.row.orderId)"
            type="text"
            class="viewBtn"
            icon="el-icon-s-promotion"
            >查看该订单</el-button
          >
          <el-button
            @click="delComment(scope.row.commentId)"
            type="text"
            class="deleteBtn"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block pageStyle">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page.sync="pageNum"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllComment, delComment } from "@/api/modules/comment.js";
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
    setRowStyle(row, column, rowIndex, columnIndex) {
      if (row.row.isBan == "1") {
        return "color: red";
      }
    },
    getCommentStatus(row) {
      let obj = {
        1: "违规",
        0: "正常",
      };
      return obj[row.isBan];
    },
    async getAllComment(pageNum) {
      this.form.pageNum = pageNum;
      this.form.pageSize = this.pageSize;
      this.form.isBan = 1;
      this.form.userId = this.$store.state.userInfo.userInfo.id;
      let result = await getAllComment(this.form);
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
    async lookdDetail(id) {},
    async delComment(id) {
      let result = await delComment(id);

      if (result.code == 200) {
        this.$message.success(result.msg);
        this.getAllComment(this.pageNum);
      } else {
        this.$message.error(result.msg);
      }
    },
    handleCurrentChange(val) {
      this.getCouponList(val);
    },
  },
  mounted() {
    this.getAllComment(1);
  },
};
</script>

<style scoped>
.redStatus {
  color: red;
}
</style>