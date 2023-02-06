<!--
 * @Description: 
 * @Date: 2022-11-24 16:38:36
 * @LastEditTime: 2023-01-16 13:46:41
 * @FilePath: \vue_test\src\pages\userList\index.vue
-->
<template>
  <div>
    <h4 class="hear_bg">我的优惠卷</h4>
    <el-form
      label-width="100px"
      :model="form"
      ref="form"
      :rules="rules"
      class="formstyle"
    >
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item prop="couponName" label="优惠卷名称">
            <el-input
              placeholder="优惠卷名称"
              v-model.trim="form.couponName"
              clearable
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item prop="coupon" label="状态">
            <el-select
              v-model="form.status"
              value-key=""
              placeholder="请选择"
              style="width: 100%"
              filterable
            >
              <el-option
                v-for="item in option"
                :key="item.codeCd"
                :label="item.codeName"
                :value="item.codeCd"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col>
      </el-row>
      <el-row justify="center" type="flex" class="mt10">
        <el-button
          size="small"
          icon="el-icon-search"
          type="primary"
          @click="getMyCoupon(1)"
          >查 询</el-button
        >
      </el-row>
    </el-form>
    <h4 class="hear_bg">我的优惠卷列表</h4>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="couponId" label="优惠卷id" width="80">
      </el-table-column>
      <el-table-column prop="couponName" label="优惠卷名称" width="100">
      </el-table-column>
      <el-table-column prop="couponDesc" label="优惠卷详情" width="180">
      </el-table-column>
      <!-- <el-table-column
        prop="couponStatus"
        label="优惠卷状态"
        width="100"
        :formatter="getCouponStatus"
      >
      </el-table-column> -->
      <el-table-column
        prop="couponCondition"
        label="优惠卷条件(单位：元)"
        width="160"
      >
      </el-table-column>
      <el-table-column prop="couponDiscount" label="折扣" width="80">
      </el-table-column>
      <el-table-column prop="couponAccount" label="抵用金额" width="180">
      </el-table-column>
      <el-table-column prop="startDate" label="获得时间" width="180">
      </el-table-column>
      <el-table-column prop="reason" label="获取途径" width="180">
      </el-table-column>
      <el-table-column prop="endDate" label="到期时间" width="180">
      </el-table-column>
      <el-table-column prop="useDate" label="使用时间" width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="180"
        :formatter="status"
      >
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
import { getMyCoupon } from "@/api/modules/coupon.js";
export default {
  data() {
    return {
      option: [
        {
          codeCd: 0,
          codeName: "全部",
        },
        {
          codeCd: "1",
          codeName: "可使用",
        },
        {
          codeCd: 2,
          codeName: "已使用",
        },
        {
          codeCd: 3,
          codeName: "已过期",
        },
      ],
      form: {
        status: 0,
      },
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
    status(row) {
      let obj = {
        1: "可使用",
        2: "已使用",
        3: "已过期",
      };
      return obj[row.status];
    },
    async getMyCoupon(pageNum) {
      this.form.pageNum = pageNum;
      this.form.pageSize = this.pageSize;
      this.form.userId = this.$store.state.userInfo.userInfo.id;
      let result = await getMyCoupon(this.form);
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
    handleCurrentChange(val) {
      this.getMyCoupon(val);
    },
  },
  mounted() {
    this.getMyCoupon(1);
  },
};
</script>

<style>
</style>