import type { Plugin, PluginOption } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import';
import { configHtmlPlugin } from './html';
import { configCompressPlugin } from './compress';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean, prodMock) {
  const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const vitePlugins: (Plugin | Plugin[] | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    // 按需引入自动创建组件声明
    Components({
      dts: true,
      resolvers: [NaiveUiResolver(), ElementPlusResolver()],
    }),
    createStyleImportPlugin({
      resolves: [VxeTableResolve()],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),

  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-mock

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }

  return vitePlugins;
}
