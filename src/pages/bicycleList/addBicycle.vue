<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-02-03 15:58:13
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-09 15:24:39
 * @FilePath: \yzy-2\src\pages\bicycleList\addBicycle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form :model="bicycleInfo" ref="bicycleInfo" label-width="150px" :rules="rules">
      <el-row :gutter="10" type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="自行车图片:" prop="bicycleImage">
            <el-upload list-type="picture-card" class="avatar-uploader" action="/api/file/upload" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="bicycleInfo.bicycleImage" :src="bicycleInfo.bicycleImage" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="自行车名称:" prop="bicycleName">
            <el-input v-model.trim="bicycleInfo.bicycleName" placeholder=""></el-input></el-form-item>
          <el-form-item label="自行车类型:" prop="bicycleType">
            <el-select v-model="bicycleInfo.bicycleType" placeholder="请选择">
              <el-option v-for="item in type_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="地区:" prop="address">
            <el-select v-model="bicycleInfo.address" placeholder="请选择">
              <el-option v-for="item in address_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时价(元):" prop="priceHour">
            <el-input-number :min="1" v-model="bicycleInfo.priceHour" placeholder=""
              :controls="false"></el-input-number></el-form-item>
          <el-form-item label="日价(元):" prop="priceDate">
            <el-input-number :min="1" v-model="bicycleInfo.priceDate" placeholder=""
              :controls="false"></el-input-number></el-form-item>
          <el-form-item label="月价(元):" prop="priceMonth">
            <el-input-number :min="1" v-model="bicycleInfo.priceMonth" placeholder=""
              :controls="false"></el-input-number></el-form-item>
          <el-form-item label="自行车描述:">
            <el-input resize="none" type="textarea" v-model="bicycleInfo.bicycleDesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="success" size="small" @click="addBicycleInfo" icon="el-icon-circle-plus-outline">
          新增</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { saveOrUpdate } from "@/api/modules/bicycle";
export default {
  data() {
    return {
      rules: {
        bicycleName: [
          { required: true, message: "请输入自行车名称", trigger: "blur" },
        ],
        bicycleType: [
          { required: true, message: "请选择自行车类型", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请选择自行车地区", trigger: "blur" },
        ],
        bicycleImage: [
          { required: true, message: "请上传自行车图片", trigger: "blur" },
        ],
        priceHour: [{ required: true, message: "请输入时价", trigger: "blur" }],
        priceDate: [{ required: true, message: "请输入日价", trigger: "blur" }],
        priceMonth: [
          { required: true, message: "请输入月价", trigger: "blur" },
        ],
      },
      bicycleInfo: { bicycleImage: "" },
      type_options: [
        {
          value: "1",
          label: "山地车",
        },
        {
          value: "2",
          label: "普通自行车",
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
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      res.code == 200
        ? (this.bicycleInfo.bicycleImage = file.response.data)
        : this.$message.error(res.msg);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addBicycleInfo() {
      this.$refs["bicycleInfo"].validate(async (valid) => {
        if (valid) {
          let result = await saveOrUpdate(this.bicycleInfo);
          if (result.code == 200) {
            this.$message.success(result.msg);
            this.$router.push("/bicycleList");
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