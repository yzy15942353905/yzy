<!--
 * @Description: 
 * @Date: 2022-11-26 17:39:41
 * @LastEditTime: 2022-11-27 00:26:22
 * @FilePath: \vue_test\src\pages\personalInfo\index.vue
-->
<template>
  <div>
    <el-form :model="userInfo" ref="userInfo" label-width="80px" :rules="rules">
      <el-row justify="center" type="flex">
        <el-col :span="12">
          <el-form-item label="用户名:" prop="userName"
            ><el-input v-model="userInfo.userName"></el-input
          ></el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="userInfo.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
              <el-radio label="保密"></el-radio></el-radio-group
          ></el-form-item>
          <el-form-item label="手机号码:" prop="phoneNumber"
            ><el-input v-model="userInfo.phoneNumber" disabled></el-input
          ></el-form-item>
          <el-form-item label="地址:" prop="address"
            ><el-input v-model="userInfo.address"></el-input
          ></el-form-item>
          <el-form-item label="个人简介:" prop="personalProfile"
            ><el-input
              type="textarea"
              v-model="userInfo.personalProfile"
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
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    updateUserInfo() {
      this.$store.dispatch("userInfo/updateUserInfo", this.userInfo);
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