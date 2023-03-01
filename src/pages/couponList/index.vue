<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-29 10:51:30
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-20 16:18:17
 * @FilePath: \yzy-2\src\pages\couponList\index.vue
 * @Description: 优惠卷管理（admin）
-->
<!--
 * @Description: 
 * @Date: 2022-11-24 16:38:36
 * @LastEditTime: 2023-01-16 13:46:41
 * @FilePath: \vue_test\src\pages\userList\index.vue
-->
<template>
  <div>
    <h4 class="hear_bg">优惠卷查询</h4>
    <el-form label-width="100px" :model="form" ref="form" :rules="rules" class="formstyle">
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item prop="couponName" label="优惠卷名称">
            <el-input placeholder="优惠卷名称" v-model.trim="form.couponName" clearable></el-input> </el-form-item></el-col>
      </el-row>
      <el-row justify="center" type="flex" class="mt10">
        <el-button size="small" icon="el-icon-search" type="primary" @click="getCouponList(1)">查 询</el-button>
      </el-row>
    </el-form>
    <h4 class="hear_bg">优惠卷列表</h4>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="couponId" label="优惠卷id" width="80">
      </el-table-column>
      <el-table-column prop="couponName" label="优惠卷名称" width="100">
      </el-table-column>
      <el-table-column prop="couponDesc" label="优惠卷详情" width="180">
      </el-table-column>
      <el-table-column prop="couponStatus" label="优惠卷状态" width="100" :formatter="getCouponStatus">
      </el-table-column>
      <el-table-column prop="couponCondition" label="优惠卷条件(单位：元)" width="160">
      </el-table-column>
      <el-table-column prop="couponDiscount" label="折扣" width="80">
      </el-table-column>
      <el-table-column prop="couponAccount" label="抵用金额" width="180">
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="180">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="lookdDetail(scope.row.couponId)" class="viewBtn" type="text"
            icon="el-icon-view">查看详情</el-button>
          <el-button v-if="scope.row.couponStatus == 1" @click="offCoupon(scope.row.couponId)" type="text"
            class="deleteBtn" icon="el-icon-delete">下架</el-button>
          <el-button v-else @click="putCoupon(scope.row.couponId)" type="text" class="editBtn"
            icon="el-icon-position">上架</el-button>
          <el-button @click="update(scope.row)" type="text" icon="el-icon-edit" class="editBtn">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block pageStyle">
      <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="pageNum"
        layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getCouponList, putCoupon, offCoupon } from "@/api/modules/coupon.js";
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
    getCouponStatus(row) {
      let obj = {
        1: "上架",
        2: "下架",
      };
      return obj[row.couponStatus];
    },
    async getCouponList(pageNum) {
      this.form.pageNum = pageNum;
      this.form.pageSize = this.pageSize;
      let result = await getCouponList(this.form);
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
    async lookdDetail(id) { },
    async offCoupon(id) {
      let result = await offCoupon(id);

      if (result.code == 200) {
        this.$message.success(result.msg);
        this.getCouponList(1);
      } else {
        this.$message.error(result.msg);
      }
    },
    async putCoupon(id) {
      let result = await putCoupon(id);

      if (result.code == 200) {
        this.$message.success(result.msg);
        this.getCouponList(1);
      } else {
        this.$message.error(result.msg);
      }
    },
    async update() { },
    handleCurrentChange(val) {
      this.getCouponList(val);
    },
  },
  mounted() {
    this.getCouponList(1);
  },
};
</script>

<style></style>