import type { Directive, App } from 'vue';
import { useLoading } from '@rascoder/vue-loading';
import type { PluginApi, AnimationType } from '@rascoder/vue-loading';
import { defaultLoadingProps } from '@/constants';
const loadingDirective: Directive = {
  mounted(ele, bind) {
    const full = ele.getAttribute('loading-full');
    const backgroundColor = ele.getAttribute('loading-background') || defaultLoadingProps.backgroundColor;
    const loader: AnimationType = ele.getAttribute('loading-loader') || defaultLoadingProps.loader;
    const color = ele.getAttribute('loading-color') || defaultLoadingProps.color;

    const instance = useLoading({
      ...defaultLoadingProps,
      backgroundColor,
      loader,
      color,
      container: ele
    });
    ele.instance = instance;
    if (bind.value) {
      instance.show({
        container: full ? null : ele
      });
    }
  },
  updated(ele, bind) {
    const instance = ele.instance as PluginApi;
    if (!instance) return;
    if (bind.value) {
      instance.show({
        container: ele.getAttribute('loading-full') === 'true' ? null : ele
      });
    } else {
      instance.hide();
    }
  }
};

export const setupLoadingDirective = (app: App) => {
  app.directive('ra-loading', loadingDirective);
};

export default loadingDirective;
