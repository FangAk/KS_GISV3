import { defineStore } from 'pinia';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';
import Mock from 'mockjs';
import { storage } from '@/utils/Storage';
import { getLoginInfo, userToken } from '@/api/login';
export type UserInfoType = {
  name: string;
  email: string;
};
export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: UserInfoType;
  pageNum: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    pageNum: 0,
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): UserInfoType {
      return this.info;
    },
    getPageNum(): number {
      return this.pageNum;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info: UserInfoType) {
      this.info = info;
    },
    setPageNum(num: number) {
      this.pageNum = num;
    },
    // 登录
    async login(params: any) {
      const token = await userToken(params);
      const response = token && (await getLoginInfo(params, { auth: token.data.token }));
      if (!response) {
        let Error = {
          code: 500,
          message: '登录失败',
          data: [],
        };
        return Error;
      }
      const { data, code } = response;
      if (code === ResultEnum.SUCCESS) {
        const ex = 7 * 24 * 60 * 60;
        storage.set(ACCESS_TOKEN, token.data.token, ex);
        storage.set(CURRENT_USER, data, ex);
        this.setToken(token.data.token);
        this.setUserInfo(data);
      }
      return response;
    },
    // 获取用户信息
    async getInfo() {
      const Random = Mock.Random;
      const token = Random.string('upper', 32, 32);
      // const result = await getUserInfoApi();
      const result = {
        userId: '1',
        username: 'admin',
        realName: 'Admin',
        avatar: Random.image(),
        desc: 'manager',
        password: Random.string('upper', 4, 16),
        token,
        permissions: [
          {
            label: '主控台',
            value: 'dashboard_console',
          },
        ],
        name: '',
        email: '',
      };
      if (result.permissions && result.permissions.length) {
        const permissionsList = result.permissions;
        this.setPermissions(permissionsList);
        this.setUserInfo(result);
      } else {
        throw new Error('getInfo: permissionsList must be a non-null array !');
      }
      this.setAvatar(result.avatar);
      return result;
    },
    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo({ name: '', email: '' });
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
    },
  },
});

// Need to be used outside the setup
export function useUser() {
  return useUserStore(store);
}
