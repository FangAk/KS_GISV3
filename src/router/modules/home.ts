import { RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: `/home`,
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
];
export default routes;
