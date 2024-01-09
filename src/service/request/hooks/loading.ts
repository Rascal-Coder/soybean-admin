import { useLoading } from '@rascoder/vue-loading';
import type { ActiveLoader } from '@rascoder/vue-loading';
import { defaultLoadingProps } from '@/constants';
const loading = useLoading({
  ...defaultLoadingProps
});
let loader: ActiveLoader;
export class AxiosLoading {
  loadingCount: number;

  isShowing: boolean;

  constructor() {
    this.loadingCount = 0;
    this.isShowing = false;
  }

  addLoading() {
    if (this.loadingCount === 0) {
      loader = loading.show();
    }
    this.loadingCount++;
  }

  closeLoading() {
    if (this.loadingCount > 0) {
      if (this.loadingCount === 1) {
        loader && loader.hide();
      }
      this.loadingCount--;
    }
  }
}
