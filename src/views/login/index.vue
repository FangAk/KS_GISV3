<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { useMessage } from "naive-ui";
import { ResultEnum } from "@/enums/httpEnum";
import { getAppEnvConfig } from "@/utils/env";
import { PageEnum } from "@/enums/pageEnum";
import { loadFull } from "tsparticles";
interface FormState {
  userName: string;
  password: string;
}
const formRef = ref();
const message = useMessage();
const loading = ref(false);
const autoLogin = ref(true);
const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;
const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
const formInline = reactive({
  userName: "",
  password: "",
  isCaptcha: true,
});
const rules = {
  userName: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};
const userStore = useUserStore();
const particlesInit = async (engine) => {
  await loadFull(engine);
};
const option = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.7,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      attract: {
        // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 1000,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 4,
    },
  },
  detectRetina: true,
};
const router = useRouter();
const route = useRoute();

const handleSubmit = (e: any) => {
  e.preventDefault();
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { userName, password } = formInline;
      message.loading("登录中@.");
      loading.value = true;

      const params: FormState = {
        userName,
        password,
      };

      try {
        const { code, message: msg } = await userStore.login(params);
        message.destroyAll();
        if (code == ResultEnum.SUCCESS) {
          const toPath = decodeURIComponent((route.query?.redirect || "/") as string);
          message.success("登录成功，即将进入系统");
          if (route.name === LOGIN_NAME) {
            router.replace("/");
          } else router.replace(toPath);
        } else {
          message.info(msg || "登录失败");
        }
      } finally {
        loading.value = false;
      }
    } else {
      message.error("请填写完整信息");
    }
  });
};
</script>
<template>
  <div id="box">
    <div class="login">
      <Particles id="tsparticles" :particlesInit="particlesInit" :options="option" />
      <img class="logo" src="@/assets/images/login/kssw-logo.png" alt="" />
      <h1 class="title">{{ VITE_GLOB_APP_TITLE }}</h1>
      <div class="loginto">
        <div class="titlename">账号登录</div>
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input
              style="--n-border: 1px solid #0091ff"
              v-model:value="formInline.userName"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <img class="loginicon" src="@/assets/images/login/user.png" alt="" />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              style="--n-border: 1px solid #0091ff"
              v-model:value="formInline.password"
              type="password"
              showPasswordOn="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <img
                    class="loginicon"
                    src="@/assets/images/login/password.png"
                    alt=""
                  />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <label class="keepuser" style="cursor: pointer" for="jzmm">
            <input
              id="jzmm"
              class="input"
              v-model="autoLogin"
              type="checkbox"
            />记住密码</label
          >
          <n-form-item>
            <n-button
              style="--n-border: 0"
              type="primary"
              @click="handleSubmit"
              size="large"
              :loading="loading"
              block
            >
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
    <div class="company">
      欢迎登录{{ VITE_GLOB_APP_TITLE }} | 版权所有 @2021-{{ new Date().getFullYear() }}
      上海启呈信息科技有限公司
    </div>
  </div>
</template>
<style scoped lang="less">
.password_input {
  position: relative;
  margin-top: 3vh;
  .icon_eye {
    position: absolute;
    right: 10px;
    top: 38%;
    cursor: pointer;
  }
}
.el-icon-view-close {
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: -1px;
    left: 6.2px;
    width: 2px;
    height: 15px;
    background-color: #fff;
    z-index: 1;
    transform: rotate(35deg);
  }
}
p {
  position: relative;
}
.icon {
  width: 4.5vh;
  height: 4.5vh;
  position: absolute;
  top: 0%;
  left: 0;
  transform: scale(0.6);
}
.iconone {
  background: url(@/assets/images/login/user.png) no-repeat center;
}
.icontwo {
  background: url(@/assets/images/login/password.png) no-repeat center;
}

button {
  width: 100%;
  background: #377cf1;
  background-image: linear-gradient(
    to bottom,
    rgb(35, 87, 222),
    rgb(55, 124, 241),
    rgb(35, 87, 222)
  );
  border: 1px solid transparent;
  color: #fff;
  height: 4.5vh;
  cursor: pointer;
  font-size: 2vh;
  margin-top: 2.5vh;
  border-radius: 4px;
}
.login {
  color: #fff;
  width: 100%;
  height: 100%;
  position: relative;
}
input::-webkit-input-placeholder {
  color: #bcc6ea;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #bcc6ea;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #bcc6ea;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #bcc6ea;
}

.loginto {
  width: 400px;
  height: 370px;
  background: url("@/assets/images/login/bg1.png") no-repeat;
  opacity: 1;
  position: relative;
  background-size: 100% 100%;
  padding: 10px 40px;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loginto .titlename {
  color: #fff;
  font-weight: normal;
  font-size: 1.1vw;
  height: 5vh;
  line-height: 4.6vh;
  text-align: center;
  background: url("@/assets/images/login/bg2.png") no-repeat center center;
  background-size: 8vw 1.5vh;
  position: relative;
  top: 2vh;
  margin-bottom: 5vh;
}
h1 {
  display: inline-block;
}
#box {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/login/Login_bg.png") no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
}
.title {
  position: absolute;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 58px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 12px;
  width: 100%;
  text-align: center;
  font-family: cursive;
  text-shadow: 2px 2px 2px grey;
}
.logo {
  width: 85px;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}

.namebox {
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  text-align: right;
  width: 275px;
  display: inline-block;
  padding-top: 10px;
}

.loginto :deep(.n-input-wrapper) {
  border-color: #0091ff;
  background-color: #113c8a;
  input {
    color: #fff;
    &:-webkit-autofill {
      -webkit-text-fill-color: #ededed !important;
      background: transparent;
      background-image: none;
      transition: background-color 50000s ease-in-out 0s;
    }
  }
  .n-input__eye {
    color: #fff;
    &:hover {
      color: #0091ff;
    }
  }
}

input[type="checkbox"] {
  position: relative;
  cursor: pointer;
}
input[type="checkbox"]::after {
  border-radius: 3px;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  /* background: #0091ff; */
  background: #4cc0f8;
  cursor: pointer;
}
input[type="checkbox"]:checked::after {
  display: none;
}
.company,
.namebox {
  font-family: "宋体";
  color: #fff;
  font-size: 12px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1%;
}
.namebox {
  bottom: 5%;
}
.loginButton {
  transition: all 0.5s;
}
.loginButton:hover {
  box-shadow: 0px 0px 12px #fff;
}
.keepuser {
  width: 100%;
  display: flex;

  justify-content: flex-end;
  input {
    margin-right: 5px;
  }
}
.loginicon {
  width: 100%;
}
</style>
