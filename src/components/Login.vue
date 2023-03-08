<!--
 * @Description: 
 * @Date: 2022-11-27 15:54:16
 * @LastEditTime: 2023-03-08 08:58:16
 * @FilePath: \vue_test\src\components\Login.vue
-->
<template>
  <div class="wrapper">
    <div class="main">
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>登 录</b>
      </div>
      <el-form :model="userForm" :rules="rules" ref="userForm">
        <el-row>
          <el-form-item prop="phone">
            <el-input
              autofocus
              auto-complete="on"
              size="medium"
              style="margin: 10px 0"
              prefix-icon="el-icon-user"
              v-model.trim="userForm.phone"
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
          <button type="button" class="btn" @click="login" autocomplete="off">
            <strong>Login</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>

          <button
            type="button"
            class="btn"
            @click="$router.replace('/register')"
            autocomplete="off"
          >
            <strong>Register</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>
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
      safety: "yzm",
      identifyCode: "",
      identifyCodes:
        "0123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", //绘制的随机数
      userForm: {
        phone: "",
        password: "",
        yzm: "",
      },
      rules: {
        phone: [
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
            this.$message.error("验证码错误，请重试！");
            return;
          }
          let result = await this.$store.dispatch(
            "userInfo/login",
            this.userForm
          );

          if (result) {
            this.$router.replace(this.$route.query.redirect || "/index");
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
      const h = this.$createElement;
      this.$forceUpdate();
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

<style scoped>
.wrapper {
  height: 100vh;
  /* 渐变色 */
  background-image: linear-gradient(to bottom left, #fc466b, #3f5efb);
  overflow: hidden;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 3rem;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#212121, #212121),
    linear-gradient(
      137.48deg,
      #ffdb3b 10%,
      #fe53bb 45%,
      #8f51ea 67%,
      #0044ff 87%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
}

#container-stars {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
}

strong {
  z-index: 2;
  font-family: "Avalors Personal Use";
  font-size: 12px;
  letter-spacing: 5px;
  color: #ffffff;
  text-shadow: 0 0 4px white;
}

#glow {
  position: absolute;
  display: flex;
  width: 12rem;
}

.circle {
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: pulse_3011 4s infinite;
  z-index: -1;
}

.circle:nth-of-type(1) {
  background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
  background: rgba(142, 81, 234, 0.704);
}

.btn:hover #container-stars {
  z-index: 1;
  background-color: #212121;
}

.btn:hover {
  transform: scale(1.1);
}

.btn:active {
  border: double 4px #fe53bb;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.btn:active .circle {
  background: #fe53bb;
}

#stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

#stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

#stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

#stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

#stars::before {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
  opacity: 0.5;
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes animStarRotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes gradient_301 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse_3011 {
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

.main {
  border-radius: 20px;
  background: linear-gradient(145deg, #3f5efb, #fc466b);
  box-shadow: 20px 20px 60px #2f6686, -20px -20px 60px #7bffff;
  margin: 200px auto;
  width: 30%;
  padding: 20px;
}
</style>
