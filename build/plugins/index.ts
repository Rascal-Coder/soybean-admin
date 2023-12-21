import type { PluginOption } from 'vite';
import pkg from '../../package.json';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevtools from 'vite-plugin-vue-devtools';
import progress from 'vite-plugin-progress';
import { setupElegantRouter } from './router';
import { setupUnocss } from './unocss';
import { setupUnplugin } from './unplugin';
import { setupBuildInfo } from './buildInfo';
import { createHtmlPlugin } from 'vite-plugin-html';
import { setupCompression } from './compression';
import { setupImagemin } from './imagemin';
import { setupVisualizer } from './visualizer';
export function setupVitePlugins(viteEnv: Env.ImportMeta, isBuild: boolean) {
  const { VITE_APP_TITLE, VITE_BUILD_IMAGEMIN, VITE_BUILD_REPORT } = viteEnv;
  const isBuildImagemin = VITE_BUILD_IMAGEMIN === 'Y';
  const isReport = VITE_BUILD_REPORT === 'Y';
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
  if (isBuild) {
    plugins.push(setupCompression(viteEnv));
    isBuildImagemin && plugins.push(setupImagemin());
  }

  if (isReport) {
    // 打包分析
    plugins.push(setupVisualizer());
  }
  return plugins;
}
