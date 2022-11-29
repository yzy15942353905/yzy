<!--
 * @Description: 
 * @Date: 2022-11-27 15:54:16
 * @LastEditTime: 2022-11-28 15:31:50
 * @FilePath: \vue_test\src\components\Login.vue
-->
<template>
  <div class="wrapper">
    <div
      style="
        margin: 200px auto;
        background-color: #fff;
        width: 350px;
        padding: 20px;
        border-radius: 10px;
      "
    >
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>登 录</b>
      </div>
      <el-form :model="userForm" :rules="rules" ref="userForm">
        <el-row>
          <el-form-item prop="username">
            <el-input
              autofocus
              auto-complete="on"
              size="medium"
              style="margin: 10px 0"
              prefix-icon="el-icon-user"
              v-model.trim="userForm.username"
            ></el-input> </el-form-item
        ></el-row>
        <el-row>
          <el-form-item prop="password">
            <el-input
              size="medium"
              auto-complete="on"
              style="margin: 10px 0"
              prefix-icon="el-icon-lock"
              show-password
              v-model.trim="userForm.password"
            ></el-input> </el-form-item
        ></el-row>
        <el-row :gutter="50" v-if="safety == 'yzm'"
          ><el-col :span="12">
            <el-form-item prop="yzm">
              <el-input
                size="medium"
                style="margin: 10px 0"
                prefix-icon="el-icon-lock"
                v-model.trim="userForm.yzm"
              ></el-input> </el-form-item></el-col
          ><el-col :span="12">
            <div class="get-code" @click="refreshCode()">
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
            <div>
              <el-button type="text" @click="refreshCode()"
                ><i class="el-icon-refresh-left"></i> 看不清？ 换一张</el-button
              >
            </div></el-col
          ></el-row
        >
        <el-row justify="center" type="flex">
          <el-button
            type="primary"
            size="small"
            autocomplete="off"
            @click="login"
            >登录</el-button
          >
          <el-button
            type="warning"
            size="small"
            autocomplete="off"
            @click="$router.replace('/register')"
            >注册</el-button
          >
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from "@/components/SIdentify.vue";
export default {
  name: "Login",
  components: { SIdentify },
  data() {
    return {
      safety: "yzm.",
      identifyCode: "",
      identifyCodes:
        "0123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", //绘制的随机数
      userForm: {
        username: "",
        password: "",
        yzm: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },

          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            min: 11,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // {
          //   min: 1,
          //   max: 16,
          //   message: "长度在 8 到 16 个字符",
          //   trigger: "blur",
          // },
        ],
      },
    };
  },
  methods: {
    login() {
      // 表单校验合法
      this.$refs["userForm"].validate(async (valid) => {
        if (valid) {
          if (
            this.safety == "yzm" &&
            this.userForm.yzm.toLowerCase() !== this.identifyCode.toLowerCase()
          ) {
            this.refreshCode();
            this.userForm.password = "";
            this.userForm.yzm = "";
            this.$message.warning("验证码错误，请重试！");
            return;
          }
          let result = await this.$store.dispatch(
            "userInfo/login",
            this.userForm
          );
          console.log("result: ", result);
          if (result) {
            this.$router.replace("/index");
            this.loginSuccess();
          } else {
            this.userForm.password = "";
            this.userForm.yzm = "";
          }
          // 发post登录请求
        } else {
        }
      });
    },
    // 登录成功提示信息
    loginSuccess() {
      console.log(this.$store.state);
      const h = this.$createElement;
      this.$notify({
        title: "登录成功！",
        message: h(
          "i",
          { style: "color: green;font-size:20px" },
          "欢迎  " + this.$store.state.userInfo.userInfo.nickName
        ),
        iconClass: "el-icon-s-promotion",
      });
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
    },
  },
  mounted() {
    this.refreshCode();
  },
};
</script>

<style>
.wrapper {
  height: 100vh;
  /* 渐变色 */
  background-image: linear-gradient(to bottom left, #fc466b, #3f5efb);
  overflow: hidden;
}
</style>