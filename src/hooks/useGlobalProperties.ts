import type { ComponentInternalInstance } from 'vue';
import { getCurrentInstance } from 'vue';
export function useGlobelProperties() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  return appContext.config.globalProperties;
}
