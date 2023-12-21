import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevtools from 'vite-plugin-vue-devtools';
import progress from 'vite-plugin-progress';
import { setupElegantRouter } from './router';
import { setupUnocss } from './unocss';
import { setupUnplugin } from './unplugin';
import { setupBuildInfo } from './buildInfo';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from '../../package.json';
export function setupVitePlugins(viteEnv: Env.ImportMeta, isBuild: boolean) {
  const { VITE_APP_TITLE } = viteEnv;
  const plugins: PluginOption = [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    VueDevtools(),
    // html title
    createHtmlPlugin({
      minify: isBuild,
      inject: {
        data: {
          title: VITE_APP_TITLE,
          injectScript: `<script>
														console.log("version:${pkg.version}")
											</script>`
        }
      }
    }),
    // 打包信息插件
    setupBuildInfo(),
    setupElegantRouter(),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    progress()
  ];

  return plugins;
}
