<!--
 * @Description: 
 * @Date: 2022-11-27 16:23:36
 * @LastEditTime: 2022-11-27 23:02:56
 * @FilePath: \vue_test\src\components\Register.vue
-->

<template>
  <div class="wrapper">
    <div class="main">
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>欢 迎 注 册</b>
        <el-button
          style="position: absolute; top: 10px; right: 20px"
          type="text"
          @click="$router.replace('/')"
          >已有账号？点我去登录</el-button
        >
      </div>
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
      >
        <el-form-item prop="userName" label="用户名">
          <el-input
            autofocus
            size="medium"
            style="margin: 10px 0"
            v-model.trim="userForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="手机号">
          <el-input
            autofocus
            size="medium"
            style="margin: 10px 0"
            v-model.trim="userForm.phoneNumber"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phoneNumberYzm" label="手机验证码">
          <el-input
            autofocus
            size="medium"
            style="margin: 10px 0"
            v-model.trim="userForm.phoneNumberYzm"
          >
            <template slot="append"
              ><el-button :disabled="phoneYzmFlag" @click="getPhoneYzm">{{
                phoneYzmText
              }}</el-button></template
            ></el-input
          >
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            size="medium"
            style="margin: 10px 0"
            show-password
            v-model.trim="userForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="Password" label="确认密码">
          <el-input
            size="medium"
            style="margin: 10px 0"
            show-password
            v-model.trim="userForm.Password"
          ></el-input>
        </el-form-item>
        <el-row :gutter="50" v-if="safety == 'yzm'"
          ><el-col :span="12">
            <el-form-item prop="yzm" label="验证码">
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
            type="warning"
            size="small"
            autocomplete="off"
            @click="register"
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
    let checkPwd = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error("请输⼊确认密码"));
      } else if (value != this.userForm.password) {
        console.log(value);
        callback(new Error("两次密码不⼀致"));
      } else {
        callback();
      }
    };
    return {
      // 获取验证码的时间间隔
      intervalTime: 10,
      // 获取验证码按钮
      phoneYzmFlag: false,
      // 验证形式
      safety: "yzm",
      // 正确的验证码
      identifyCode: "",
      // 验证码取值
      identifyCodes:
        "0123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", //绘制的随机数
      userForm: {
        userName: "",
        phoneNumber: "",
        password: "",
        Password: "",
        yzm: "",
        phoneNumberYzm: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            min: 11,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        phoneNumberYzm: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: "blur",
          },
        ],
        Password: [
          { message: "请输入密码", trigger: "blur" },
          { validator: checkPwd, required: true, trigger: "blur" },
        ],
        yzm: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    register() {
      // 表单校验合法
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          if (
            this.safety == "yzm" &&
            this.userForm.yzm.toLowerCase() !== this.identifyCode.toLowerCase()
          ) {
            this.refreshCode();
            this.userForm.yzm = "";
            this.$message.warning("验证码错误，请重试！");
            return;
          }
          // 发post注册请求
          this.$router.replace("/index");
          this.loginSuccess();
        } else {
        }
      });
    },
    // 注册成功，自动登录提示信息
    loginSuccess() {
      const h = this.$createElement;
      this.$notify({
        title: "登录成功！",
        message: h(
          "i",
          { style: "color: green;font-size:20px" },
          "注册成功，已为您自动登录！"
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
    // 获取手机验证码
    getPhoneYzm() {
      if (this.userForm.phoneNumber == "") {
        this.$message.warning("请输入手机号！");
        return;
      } else if (!this.userForm.phoneNumber.match(/^1[3|5|7|8|9]\d{9}$/)) {
        this.$message.warning("输入的手机号格式不正确！");
        return;
      }
      let timer = setInterval(() => {
        if (!--this.intervalTime) {
          clearInterval(timer);
          this.intervalTime = 10;
          this.phoneYzmFlag = false;
        }
      }, 1000);
      this.phoneYzmFlag = true;
      this.userForm.phoneNumberYzm = (Math.random() + "").slice(-6);
    },
  },
  mounted() {
    this.refreshCode();
  },
  computed: {
    phoneYzmText() {
      return this.phoneYzmFlag
        ? this.intervalTime + "秒后重试..."
        : "获取验证码";
    },
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
.main {
  position: relative;
  margin: 100px auto;
  background-color: #fff;
  width: 600px;
  padding: 20px;
  border-radius: 10px;
}
.el-form-item {
  margin: 0;
}
.el-form-item__label {
  margin-top: 10px;
}
.el-form-item__error {
  top: 85%;
}
</style>