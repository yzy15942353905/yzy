
<template>
  <div>
    <h4 class="hear_bg">全部订单</h4>
    <el-form
      label-width="100px"
      :model="form"
      ref="form"
      :rules="rules"
      class="formstyle"
    >
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item prop="orderId" label="订单编号">
            <el-input
              placeholder="订单编号"
              v-model.trim="form.orderId"
              clearable
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item prop="orderStatus" label="订单状态">
            <el-select
              v-model="form.orderStatus"
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
          @click="getMyOrder(1)"
          >查 询</el-button
        >
      </el-row>
    </el-form>
    <h4 class="hear_bg">全部订单列表</h4>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="orderId" label="订单编号" width="80">
      </el-table-column>
      <el-table-column prop="bicycleId" label="自行车编号" width="100">
      </el-table-column>
      <el-table-column prop="bicycleName" label="自行车名称" width="180">
      </el-table-column>
      <el-table-column prop="userId" label="租客编号" width="180">
      </el-table-column>
      <el-table-column prop="nickName" label="租客姓名" width="180">
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="160">
      </el-table-column>
      <el-table-column prop="expectEndTime" label="预计结束时间" width="160">
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="160">
      </el-table-column>
      <el-table-column
        prop="rentType"
        label="租赁方式"
        width="180"
        :formatter="rentType"
      >
      </el-table-column>
      <el-table-column prop="rentTime" label="租赁时长" width="180">
      </el-table-column>
      <el-table-column prop="ifExceed" label="是否超过服务范围" width="180">
      </el-table-column>
      <el-table-column
        prop="ifCoupon"
        label="是否使用优惠卷"
        width="180"
        :formatter="YesOrNo"
      >
      </el-table-column>
      <el-table-column prop="couponId" label="优惠卷编号" width="180">
      </el-table-column>
      <el-table-column prop="couponName" label="优惠卷名称" width="180">
      </el-table-column>

      <el-table-column prop="deposit" label="订单押金" width="180">
      </el-table-column>
      <el-table-column prop="address" label="自行车所属区域" width="180">
      </el-table-column>
      <el-table-column prop="returnAddress" label="归还区域" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="租客电话" width="180">
      </el-table-column>
      <el-table-column prop="rentTotal" label="总租金" width="180">
      </el-table-column>
      <el-table-column prop="discoutTotal" label="实付金额" width="180">
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
        width="180"
        :formatter="orderStatus"
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
import { getMyOrder } from "@/api/modules/order.js";
export default {
  data() {
    return {
      option: [
        {
          codeCd: 0,
          codeName: "全部",
        },
        {
          codeCd: 1,
          codeName: "生效中",
        },
        {
          codeCd: 2,
          codeName: "已完成",
        },
        {
          codeCd: 3,
          codeName: "已完成，待评价",
        },
        {
          codeCd: 4,
          codeName: "已取消",
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
    YesOrNo(_, __, value) {
      let obj = {
        1: "是",
        0: "否",
      };
      return obj[value];
    },
    orderStatus(row) {
      let obj = {
        1: "生效中",
        2: "已完成",
        3: "已完成，待评价",
        4: "已取消",
      };
      return obj[row.orderStatus];
    },
    rentType(row) {
      let obj = {
        1: "/时",
        2: "/天",
        3: "/月",
      };
      return obj[row.rentType];
    },
    async getMyOrder(pageNum) {
      this.form.pageNum = pageNum;
      this.form.pageSize = this.pageSize;
      let result = await getMyOrder(this.form);
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
      this.getMyOrder(val);
    },
  },
  computed: {},
  beforeUpdate() {
    // this.getMyOrder(1);
  },
  mounted() {
    this.getMyOrder(1);
  },
};
</script>

<style>
</style>