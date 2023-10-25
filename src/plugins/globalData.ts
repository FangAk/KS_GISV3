import { App } from 'vue';
interface GlobalDataProps {
  getTime: Function;
  rangeShortcuts: {
    [key: string]: [number, number] | (() => [number, number]);
  };
}
const getTime = () => {
  const week = ['日', '一', '二', '三', '四', '五', '六']
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weeks = date.getDay()
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const second = date.getSeconds().toString().padStart(2, '0')
  return `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日 星期${week[weeks]} ${hour}:${minute}:${second}`
}

const Data: GlobalDataProps = {
  getTime,
  rangeShortcuts: {
    近一周: () => {
      const cur = new Date().getTime();
      return [cur - 7 * 24 * 60 * 60 * 1000, cur];
    },
    这个月: () => {
      const cur = new Date().getTime();
      return [cur - 30 * 24 * 60 * 60 * 1000, cur];
    },
    近一月: () => {
      const cur = new Date().getTime();
      return [cur - 30 * 24 * 60 * 60 * 1000, cur];
    },
    本季度: () => {
      const cur = new Date().getTime();
      return [cur - 90 * 24 * 60 * 60 * 1000, cur];
    },
    上季度: () => {
      const cur = new Date().getTime();
      return [cur - 90 * 24 * 60 * 60 * 1000, cur];
    },
    近一年: () => {
      const cur = new Date().getTime();
      return [cur - 365 * 24 * 60 * 60 * 1000, cur];
    },
  },
};
export function getGlobalData(app: App<Element>) {
  app.config.globalProperties.$Data = Data;
}
