import pkg from '../../package.json';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevtools from 'vite-plugin-vue-devtools';
import progress from 'vite-plugin-progress';
import { createHtmlPlugin } from 'vite-plugin-html';
import { setupElegantRouter } from './router';
import { setupUnocss } from './unocss';
import { setupUnplugin } from './unplugin';
// import { setupBuildInfo } from './buildInfo';
// import { setupCompression } from './compression';
// import { setupImagemin } from './imagemin';
import { setupMock } from './mock';
// import { setupCDN } from './cdn';

// import { setupVisualizer } from './visualizer';
export function setupVitePlugins(viteEnv: Env.ImportMeta, isBuild: boolean) {
  const { VITE_APP_TITLE } = viteEnv;
  // const isBuildImagemin = VITE_BUILD_IMAGEMIN === 'Y';
  // const isReport = VITE_BUILD_REPORT === 'Y';
  // const isCdn = VITE_CDN === 'Y';
  const plugins = [
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
    // setupBuildInfo(),
    setupElegantRouter(),
    setupUnocss(viteEnv),
    setupMock(isBuild),
    ...setupUnplugin(viteEnv),
    progress()
    // isReport ? setupVisualizer() : null,
    // isCdn ? setupCDN : null,
    // isBuild ? setupCompression(viteEnv) : null,
    // isBuildImagemin && isBuild ? setupImagemin() : null
  ];
  return plugins;
}
