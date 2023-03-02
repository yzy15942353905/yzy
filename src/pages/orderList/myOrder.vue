<template>
  <div>
    <h4 class="hear_bg">我的订单</h4>
    <el-form
      label-width="100px"
      :model="form"
      ref="form"
      :rules="rules"
      class="formstyle"
    >
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item prop="orderId" label="订单编号">
            <el-input
              placeholder="订单编号"
              v-model.trim="form.orderId"
              clearable
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item prop="orderStatus" label="订单状态">
            <el-select
              :popper-append-to-body="false"
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
        <el-button size="small" type="primary" @click="getMyOrder(1)"
          >查 询</el-button
        >
      </el-row>
    </el-form>
    <h4 class="hear_bg">我的订单列表</h4>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="orderId" label="订单编号" width="80">
      </el-table-column>
      <el-table-column prop="bicycleId" label="自行车编号" width="100">
      </el-table-column>
      <el-table-column prop="bicycleName" label="自行车名称" width="180">
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
        fixed="right"
        :formatter="orderStatus"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.orderStatus == 1"
            @click="cancelOrder(scope.row.orderId)"
            type="text"
            class="viewBtn"
            icon="el-icon-s-promotion"
            >取消订单</el-button
          >
          <el-button
            v-if="scope.row.orderStatus == 1"
            @click="afterEndOrder(scope.row.orderId)"
            type="text"
            class="editBtn"
            icon="el-icon-switch-button"
            >结束订单</el-button
          >
          <el-button
            v-if="
              scope.row.orderStatus == 2 ||
              scope.row.orderStatus == 4 ||
              scope.row.orderStatus == 6
            "
            @click="deleteOrder(scope.row.orderId)"
            type="text"
            class="deleteBtn"
            icon="el-icon-delete"
            >删除</el-button
          >
          <el-button
            v-if="scope.row.orderStatus == 3 || scope.row.orderStatus == 7"
            @click="afterApplyRefund(scope.row.orderId)"
            type="text"
            class="deleteBtn"
            icon="el-icon-delete"
            >申请退款</el-button
          >
          <el-button
            v-if="scope.row.orderStatus == 5"
            @click="cancelApplyRefund(scope.row.refundId)"
            type="text"
            class="editBtn"
            icon="el-icon-s-opportunity"
            >取消申请</el-button
          >
          <el-button
            v-if="scope.row.orderStatus == 3 || scope.row.orderStatus == 7"
            @click="afterCommmentOrder(scope.row.orderId)"
            type="text"
            class="viewBtn"
            icon="el-icon-s-promotion"
            >评价</el-button
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

    <el-dialog title="结束订单" :visible.sync="dialogVisible" width="70%">
      <el-form ref="order" :model="order" label-width="80px" :rules="rules">
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="订单编号">
              <el-input v-model="order.orderId" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="地区:" prop="returnAddress">
              <el-select
                :popper-append-to-body="false"
                v-model="order.returnAddress"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in address_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-row :gutter="10" type="flex" justify="center">
          <el-button type="primary" @click="endOrder">结束订单</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-row>
      </span>
    </el-dialog>

    <el-dialog
      title="评价订单"
      :visible.sync="dialogVisibleComment"
      width="70%"
    >
      <el-form
        ref="commentOrder"
        :model="commentOrder"
        label-width="100px"
        :rules="rulesComment"
      >
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="订单编号：">
              <el-input v-model="commentOrder.orderId" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="评分：" prop="star">
              <el-rate v-model="commentOrder.star"></el-rate>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="评论内容：" prop="commentContent">
              <el-input
                type="textarea"
                v-model="commentOrder.commentContent"
                resize="none"
                placeholder="良言一句三冬暖，恶语伤人六月寒！"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-row :gutter="10" type="flex" justify="center">
          <el-button type="primary" @click="commentOrderFun"
            >点我评论</el-button
          >
          <el-button @click="dialogVisibleComment = false">取 消</el-button>
        </el-row>
      </span>
    </el-dialog>

    <el-dialog title="申请退款" :visible.sync="dialogVisibleApply" width="70%">
      <el-form
        ref="applyOrder"
        :model="applyOrder"
        label-width="120px"
        :rules="rulesApply"
      >
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="订单编号">
              <el-input v-model="applyOrder.orderId" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="申请退款种类:" prop="refundType">
              <el-select
                :popper-append-to-body="false"
                v-model="applyOrder.refundType"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in refundType_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="申请退款原因" prop="refundDesc">
              <el-input
                v-model="applyOrder.refundDesc"
                type="textarea"
                resize="none"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-row :gutter="10" type="flex" justify="center">
          <el-button type="primary" @click="applyRefund">申请退款</el-button>
          <el-button @click="dialogVisibleApply = false">取 消</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMyOrder,
  cancelOrder,
  deleteOrder,
  finishOrder,
  commentOrder,
} from "@/api/modules/order.js";
import { applyRefund, cancelApplyRefund } from "@/api/modules/applyRefund.js";
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
      address_options: [
        {
          value: 1001,
          label: "地区1",
        },
        {
          value: 1002,
          label: "地区2",
        },
      ],
      refundType_options: [
        {
          value: 0,
          label: "自行车体验感极差",
        },
        {
          value: 1,
          label: "自行车损坏",
        },
        {
          value: 2,
          label: "其他",
        },
      ],
      form: {
        status: 0,
      },
      rules: {
        returnAddress: [
          { required: true, message: "请选择归还地点", trigger: "change" },
        ],
      },
      rulesComment: {
        star: [{ required: true, message: "请打分！", trigger: "blur" }],
        commentContent: [
          { required: true, message: "请输入评价内容！", trigger: "blur" },
        ],
      },
      rulesApply: {
        refundType: [
          { required: true, message: "请选择申请退款种类", trigger: "blur" },
        ],
      },
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      order: { orderId: "" },
      applyOrder: { refundType: "" },
      dialogVisible: false,
      commentOrder: { orderId: "", commentContent: "", star: 0 },
      dialogVisibleComment: false,
      dialogVisibleApply: false,
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
        5: "申请退款中",
        6: "申请退款已通过",
        7: "申请退款已被驳回",
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
    // 获取我的订单列表
    async getMyOrder(pageNum) {
      this.form.pageNum = pageNum;
      this.form.pageSize = this.pageSize;
      this.form.userId = this.$store.state.userInfo.userInfo.id;
      this.form.isSelf;
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
    // 取消订单
    async cancelOrder(refundId) {
      let result = await cancelOrder(refundId);

      result.code == 200
        ? (this.$message.success(result.msg), this.getMyOrder(1))
        : this.$message.error(result.msg);
    },
    // 删除订单
    async deleteOrder(orderId) {
      let result = await deleteOrder(orderId);
      result.code == 200
        ? (this.$message.success(result.msg), this.getMyOrder())
        : this.$message.error(result.msg);
    },
    afterEndOrder(orderId) {
      this.dialogVisible = true;
      this.order.orderId = orderId;
    },
    // 结束订单
    async endOrder() {
      this.$refs["order"].validate(async (valid) => {
        if (valid) {
          let result = await finishOrder(this.order);
          if (result.code == 200) {
            this.dialogVisible = false;
            this.getMyOrder(1);
            let msg = "";
            if (result.data) {
              for (let index = 0; index < result.data.length; index++) {
                msg += result.data[index].desc + "\n";
              }
              this.$alert(msg, result.msg, {
                confirmButtonText: "确定",
                callback: (action) => {},
              });
            }
          } else {
            this.$message.error(result.msg);
          }
        }
      });
    },
    afterCommmentOrder(orderId) {
      this.$refs["commentOrder"] && this.$refs["commentOrder"].clearValidate();
      this.commentOrder = {};

      this.commentOrder.orderId = orderId;
      this.dialogVisibleComment = true;
    },
    async commentOrderFun() {
      this.$refs["commentOrder"].validate(async (valid) => {
        if (valid) {
          let result = await commentOrder(this.commentOrder);
          if (result.code == 200) {
            this.dialogVisibleComment = false;
            this.$message.success(result.msg);
          } else {
            this.$message.error(result.msg);
          }
        }
      });
    },
    handleCurrentChange(val) {
      this.getMyOrder(val);
    },
    afterApplyRefund(orderId) {
      this.$refs["applyOrder"] && this.$refs["applyOrder"].clearValidate();
      this.applyOrder = {};
      this.applyOrder.orderId = orderId;
      this.dialogVisibleApply = true;
    },
    // 申请退款
    async applyRefund() {
      let result = await applyRefund(this.applyOrder);
      if (result.code == 200) {
        this.dialogVisibleApply = false;
        this.$message.success(result.msg);
        this.getMyOrder(1);
      } else {
        this.$message.error(result.msg);
      }
    },
    // 取消申请退款
    async cancelApplyRefund(refundId) {
      let result = await cancelApplyRefund(refundId);
      if (result.code == 200) {
        this.$message.success(result.msg);
        this.getMyOrder(1);
      } else {
        this.$message.error(result.msg);
      }
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

<style></style>
