<template>
  <div>
    <h4 class="hear_bg">新增优惠卷</h4>
    <el-form
      :model="couponInfo"
      ref="couponInfo"
      label-width="200px"
      :rules="rules"
      class="formstyle"
    >
      <el-row :gutter="10" type="flex" justify="center">
        <el-col :span="12">
          <!-- <el-form-item label="优惠卷图片:" prop="couponImage">
              <el-upload
                list-type="picture-card"
                class="avatar-uploader"
                action="/api/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="couponInfo.couponImage"
                  :src="couponInfo.couponImage"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item> -->

          <el-form-item label="优惠卷名称:" prop="couponName">
            <el-input
              v-model.trim="couponInfo.couponName"
              placeholder=""
            ></el-input
          ></el-form-item>
          <el-form-item label="优惠卷满足（金额/元）" prop="couponCondition">
            <el-input-number
              :min="1"
              v-model="couponInfo.couponCondition"
              :controls="false"
              placeholder=""
              style="width: 100%"
            ></el-input-number
          ></el-form-item>
          <el-form-item label="折扣" prop="couponDiscount">
            <el-input-number
              :min="0.1"
              :max="0.9"
              :precision="1"
              v-model="couponInfo.couponDiscount"
              placeholder=""
              :controls="false"
              style="width: 100%"
            ></el-input-number
          ></el-form-item>
          <!-- <el-form-item label="可抵用（金额/元）:" prop="couponAccount">
                        <el-input-number :min="1" v-model="couponInfo.couponAccount" placeholder=""
                            :controls="false"></el-input-number></el-form-item> -->
          <el-form-item label="优惠卷描述:">
            <el-input
              resize="none"
              type="textarea"
              v-model="couponInfo.couponDesc"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button
          type="success"
          size="small"
          @click="addcouponInfo"
          icon="el-icon-circle-plus-outline"
        >
          新增</el-button
        >
        <el-button
          type="danger"
          size="small"
          @click="couponInfo = {}"
          icon="el-icon-delete"
          >清空</el-button
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { saveOrUpdate } from "@/api/modules/coupon";
export default {
  data() {
    return {
      rules: {
        couponName: [
          { required: true, message: "请输入优惠卷名称", trigger: "blur" },
        ],
        couponCondition: [
          { required: true, message: "请输入优惠卷满足金额", trigger: "blur" },
        ],
        couponDiscount: [
          { required: true, message: "请输入优惠卷折扣", trigger: "blur" },
        ],
      },
      couponInfo: {},
    };
  },
  methods: {
    addcouponInfo() {
      this.$refs["couponInfo"].validate(async (valid) => {
        if (valid) {
          this.couponInfo.creator = this.$store.state.userInfo.userInfo.id;
          let result = await saveOrUpdate(this.couponInfo);
          if (result.code == 200) {
            this.$confirm(result.msg + ",是否进行新增？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              showCancelButton: true,
              type: "warning",
            })
              .then(() => {
                this.couponInfo = {};
              })
              .catch(() => {
                this.$router.push("/couponList");
              });
          } else {
            this.$message.error(result.msg);
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}

.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
