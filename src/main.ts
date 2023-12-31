import './styles/tailwind.css';
import { createApp } from 'vue';
import {
  setupNaive,
  setupDirectives,
  setupEcharts,
  getGlobalData,
} from '@/plugins';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from '@/store';
import Particles from 'vue3-particles';
import { setUpCommonFun } from '@/utils/common';
import "element-plus/dist/index.css";
async function bootstrap() {
  const app = createApp(App).use(Particles);
  // 挂载状态管理
  setupStore(app);

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);
  // 注册全局常用的 echarts
  setupEcharts(app);
  //注册全局公用方法
  setUpCommonFun(app);

  // 注册全局自定义组件
  //setupCustomComponents();

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app);

  // 注册全局方法，如：app.config.globalProperties.$message = message
  //setupGlobalMethods(app);

  // 挂载路由
  setupRouter(app);

  //全局获取Data
  getGlobalData(app);
  // 路由准备就绪后挂载 APP 实例
  // https://router.vuejs.org/api/interfaces/router.html#isready
  await router.isReady();
  // https://www.naiveui.com/en-US/os-theme/docs/style-conflict#About-Tailwind's-Preflight-Style-Override
  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);

  app.mount('#app', true);
}

void bootstrap();
