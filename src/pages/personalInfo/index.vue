<!--
 * @Description: 
 * @Date: 2022-11-26 17:39:41
 * @LastEditTime: 2023-01-05 14:42:19
 * @FilePath: \vue_test\src\pages\personalInfo\index.vue
-->
<template>
  <div>
    <el-form :model="userInfo" ref="userForm" label-width="80px" :rules="rules">
      <el-row justify="center" type="flex">
        <el-col :span="12">
          <el-form-item label="头像 :" prop="avatar" style="position: relative">
            <div class="demo-basic--circle">
              <el-avatar
                :size="100"
                :src="userInfo.avatar"
                icon="el-icon-user-solid"
                style="font-size: 50px"
              ></el-avatar>
            </div>
            <el-upload
              style="position: absolute; top: 30px; left: 170px"
              action="/api/file/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称 :" prop="nickName"
            ><el-input v-model="userInfo.nickName"></el-input
          ></el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="userInfo.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
              <el-radio label="保密"></el-radio></el-radio-group
          ></el-form-item>
          <el-form-item label="手机号码:" prop="phoneNumber"
            ><el-input v-model="userInfo.phone" disabled></el-input
          ></el-form-item>
          <el-form-item label="积分:" prop="phoneNumber"
            ><el-input v-model="userInfo.points" disabled></el-input
          ></el-form-item>
          <el-form-item label="信誉度:" prop="phoneNumber"
            ><el-input v-model="userInfo.credit" disabled></el-input
          ></el-form-item>
          <el-form-item label="地址:" prop="address"
            ><el-input v-model="userInfo.address"></el-input
          ></el-form-item>
          <el-form-item label="个人简介:" prop="personalProfile"
            ><el-input
              type="textarea"
              v-model="userInfo.introduction"
              :rows="4"
              resize="none"
            ></el-input></el-form-item
        ></el-col>
      </el-row>
      <el-row justify="center" type="flex">
        <el-button type="success" size="small" @click="updateUserInfo">
          修改</el-button
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      rules: {
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    updateUserInfo() {
      this.$refs["userForm"].validate(async (valid) => {
        if (valid) {
          let result = this.$store.dispatch(
            "userInfo/updateUserInfo",
            this.userInfo
          );
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log("file.response.data", file.response);
      res.code == 200 && (this.userInfo.avatar = file.response.data);
      res.code != 200 && this.$message.error(res.msg);
    },
    beforeAvatarUpload(file) {
      const isJP = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJP) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      setTimeout(() => {
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
      }, 0);

      return isJP && isLt2M;
    },
  },
  mounted() {
    this.userInfo = this.$commonUtils.deepCopy(
      this.$store.state.userInfo.userInfo
    );
  },
};
</script>

<style>
</style>