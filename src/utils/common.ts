import type { App } from 'vue';
export function setUpCommonFun(app: App<Element>) {
  const echartsResize = (fn: any) => {
    window.addEventListener('resize', fn)
  }
  app.config.globalProperties.echartsResize = echartsResize;//vue3的挂载方式
}