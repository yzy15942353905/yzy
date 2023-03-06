<!--
 * @Description:  申请退款订单列表
 * @Date: 2022-11-26 15:47:08
 * @LastEditTime: 2023-03-03 16:09:14
 * @FilePath: \vue_test\src\pages\role\index.vue
-->
<template>
  <div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="120px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="退款订单状态：">
        <el-select
          :popper-append-to-body="false"
          v-model="form.status"
          @change="getApplyRefundList"
        >
          <el-option
            v-for="item in options"
            :key="item.codeId"
            :label="item.label"
            :value="item.codeId"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div v-if="refundOrderList.length != 0">
      <div
        v-for="item in refundOrderList"
        :key="item.refundId"
        style="position: relative"
      >
        <el-descriptions title="退款信息" :column="3" class="descriptionsStyle">
          <!-- <el-descriptions-item label="退款流水id">{{
          item.refundId
        }}</el-descriptions-item> -->
          <el-descriptions-item label="申请退款人昵称">{{
            item.userName
          }}</el-descriptions-item>
          <el-descriptions-item label="订单金额">{{
            item.orderAccount + " 元"
          }}</el-descriptions-item>

          <!-- 申请种类必填 -->
          <el-descriptions-item label="申请退款类型">{{
            item.refundType
          }}</el-descriptions-item>
          <!-- 申请原因选填 -->
          <el-descriptions-item label="申请退款原因">{{
            item.refundDesc
          }}</el-descriptions-item>
          <el-descriptions-item label="申请时间">{{
            item.applyDate
          }}</el-descriptions-item>

          <el-descriptions-item label="处理人昵称" v-if="item.ifHandle == 1">{{
            item.handleName
          }}</el-descriptions-item>
          <el-descriptions-item label="处理人意见" v-if="item.ifHandle == 1">{{
            item.handleComment
          }}</el-descriptions-item>
          <el-descriptions-item label="处理时间" v-if="item.ifHandle == 1">{{
            item.handleDate
          }}</el-descriptions-item>

          <el-descriptions-item label="操作" v-if="item.ifHandle == 0">
            <el-button
              type="success"
              size="mini"
              @click="afterHandle(item.refundId)"
              >处理</el-button
            >
          </el-descriptions-item>
          <el-descriptions-item label="处理结果" v-else>{{
            item.ifApproval
          }}</el-descriptions-item>
        </el-descriptions>
        <svg-icon
          v-if="item.ifHandle"
          :icon-class="getRightOrError(item.ifApproval)"
          class="rightOrError"
        />
      </div>
    </div>
    <el-empty description="暂无此类订单" v-else></el-empty>
    <el-dialog title="处理退款订单" :visible.sync="dialogVisible" width="70%">
      <el-form
        ref="refundForm"
        :model="refundForm"
        label-width="100px"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-descriptions
            title="退款信息"
            :column="3"
            class="descriptionsStyle"
          >
            <!-- <el-descriptions-item label="退款流水id">{{
              applyRefundOneInfo.refundId
            }}</el-descriptions-item> -->
            <el-descriptions-item label="申请退款人昵称">{{
              applyRefundOneInfo.userName
            }}</el-descriptions-item>
            <el-descriptions-item label="订单金额">{{
              applyRefundOneInfo.orderAccount + " 元"
            }}</el-descriptions-item>

            <!-- 申请种类必填 -->
            <el-descriptions-item label="申请退款类型">{{
              applyRefundOneInfo.refundType
            }}</el-descriptions-item>
            <!-- 申请原因选填 -->
            <el-descriptions-item label="申请退款原因">{{
              applyRefundOneInfo.refundDesc
            }}</el-descriptions-item>
            <el-descriptions-item label="申请时间">{{
              applyRefundOneInfo.applyDate
            }}</el-descriptions-item>
          </el-descriptions>
        </el-row>

        <el-row :gutter="10" justify="center" type="flex">
          <el-col :span="12">
            <el-form-item label="处理意见：" prop="handleComment">
              <el-input
                type="textarea"
                v-model="refundForm.handleComment"
                resize="none"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row :gutter="20" justify="center" type="flex">
          <el-button type="success" size="mini" @click="handle(1)"
            >同意退款</el-button
          >
          <el-button type="danger" size="mini" @click="handle(0)"
            >驳回请求</el-button
          >
          <el-button @click="dialogVisible = false" size="mini"
            >取 消</el-button
          >
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getApplyRefundList,
  handleRefund,
  getRefundIdById,
} from "@/api/modules/applyRefund.js";
export default {
  data() {
    return {
      form: { status: "2" },
      refundOrderList: [],
      dialogVisible: false,
      refundForm: {
        // 处理意见
        handleComment: "",
      },
      rules: {
        handleComment: [
          { required: true, message: "请输入处理意见！", trigger: "blur" },
        ],
      },
      options: [
        {
          codeId: "0",
          label: "未处理",
        },
        {
          codeId: "1",
          label: "已处理",
        },
        {
          codeId: "2",
          label: "全部",
        },
      ],
      applyRefundOneInfo: {},
    };
  },
  methods: {
    // 处理意见码值转换
    getHandleComment(status) {
      let obj = {
        0: "驳回请求",
        1: "同意退款",
      };
      return obj[status] ? obj[status] : "";
    },
    // 申请退款种类 码值转换
    getApplyRefundType(status) {
      let obj = {
        0: "自行车体验感极差",
        1: "自行车损坏",
        2: "其他",
      };
      return obj[status] ? obj[status] : "";
    },
    async getApplyRefundList() {
      let form = {
        ifHandle: this.form.status,
      };
      let result = await getApplyRefundList(form);
      if (result.code == 200) {
        if (result.data.length == 0) {
          this.$message.warning("您查询的结果不存在！");
          this.refundOrderList = [];
        } else {
          let temp = result.data;
          for (let index = 0; index < temp.length; index++) {
            temp[index].refundType = this.getApplyRefundType(
              temp[index].refundType
            );
            temp[index].ifApproval = this.getHandleComment(
              temp[index].ifApproval
            );
          }
          this.refundOrderList = temp;
        }
      } else {
        this.$message.error(result.msg);
      }
    },
    // 处理之前
    async afterHandle(refundId) {
      this.refundId = refundId;
      let result = await getRefundIdById(refundId);
      if (result.code == 200) {
        this.applyRefundOneInfo = result.data;
        this.dialogVisible = true;
        this.$refs["refundForm"] && this.$refs["refundForm"].clearValidate();
      } else {
        this.$message.error(result.msg);
      }
    },
    // 处理
    async handle(approvalOrReject) {
      this.$refs["refundForm"].validate(async (valid) => {
        if (valid) {
          this.refundForm.refundId = this.refundId;
          this.refundForm.ifApproval = approvalOrReject;
          this.refundForm.handleId = this.$store.state.userInfo.userInfo.id;
          let result = await handleRefund(this.refundForm);
          if (result.code == 200) {
            this.$message.success(result.msg);
            this.dialogVisible = false;
            this.getApplyRefundList();
          } else {
            this.$message.error(result.msg);
          }
        }
      });
    },
    // getRightOrError
    getRightOrError(ifApproval) {
      return ifApproval == "同意退款" ? "duigou1" : "cuowu";
    },
  },
  computed: {},
  mounted() {
    this.getApplyRefundList();
  },
};
</script>

<style scoped>
.descriptionsStyle {
  margin-bottom: 5vh;
  border: 1px solid #fafbfe;
  transition: all 0.3s;
  padding: 10px 10px;
}
.descriptionsStyle:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.rightOrError {
  position: absolute;
  top: 50%;
  right: 10%;
  font-size: 7vh;
}
</style>
