<!--
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2022-12-05 16:53:57
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-01-06 08:53:01
 * @FilePath: \yzy-2\src\pages\system\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form
      label-width="80px"
      :model="form"
      ref="form"
      :rules="rules"
      class="formstyle"
    >
      <el-row :gutter="5" justify="center" type="flex">
        <el-col :span="12">
          <el-form-item prop="nickName" label="昵称">
            <el-input
              v-model.trim="form.nickName"
              clearable
              disabled
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="5" justify="center" type="flex">
        <el-col :span="12">
          <el-form-item prop="phone" label="手机号码">
            <el-input
              v-model.trim="form.phone"
              clearable
              disabled
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="5" justify="center" type="flex">
        <el-col :span="12">
          <el-form-item prop="oldPasswode" label="旧密码">
            <el-input
              show-password
              v-model.trim="form.oldPassword"
              clearable
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="5" justify="center" type="flex">
        <el-col :span="12">
          <el-form-item prop="password" label="新密码">
            <el-input
              show-password
              v-model.trim="form.password"
              clearable
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="5" justify="center" type="flex">
        <el-col :span="12">
          <el-form-item prop="Password" label="确认密码">
            <el-input
              show-password
              v-model.trim="form.Password"
              clearable
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row justify="center" type="flex">
        <el-button @click="alertPassword">修改密码</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { alertPassword } from "@/api/user.js";
export default {
  data() {
    let checkPwd = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error("请输⼊确认密码"));
      } else if (value != this.form.password) {
        callback(new Error("两次密码不⼀致"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: "blur",
          },
        ],
        Password: [
          { message: "请再次输入新密码", trigger: "blur" },
          { validator: checkPwd, required: true, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.form = this.$commonUtils.deepCopy(this.$store.state.userInfo.userInfo);
  },
  methods: {
    async alertPassword() {
      let form = {
        id: this.form.id,
        phone: this.form.phone,
        password: this.form.password,
        oldPassword: this.form.oldPassword,
      };
      let result = await alertPassword(form);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: result.msg,
        });
        this.$router.replace("/");
      } else {
        this.$message({
          type: "warning",
          message: result.msg,
        });
      }
    },
  },
};
</script>

<style>
</style>