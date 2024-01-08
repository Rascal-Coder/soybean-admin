import type { App } from 'vue';
import { createApp } from 'vue';
import './plugins/assets';
import { setupNProgress, setupIconifyOffline, setupDayjs, setupGlobalUtils } from './plugins';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupI18n } from './locales';
import { setupLoadingDirective } from './directive';
import { LoadingPlugin } from '@rascoder/vue-loading';

import Root from './App.vue';

async function setupApp() {
  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  const app = createApp(Root);

  setupGlobalUtils(app);

  setupStore(app);

  app.use(LoadingPlugin);
  await setupRouter(app);

  setupI18n(app);
  // 注册指令
  setupDirective(app);

  app.mount('#app');
}
function setupDirective(app: App) {
  // 注册loading自定义指令
  setupLoadingDirective(app);
}
setupApp();
