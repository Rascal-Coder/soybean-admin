import { useLoading } from '@rascoder/vue-loading';
import { defaultLoadingProps } from '@/constants';
const loading = useLoading({
  ...defaultLoadingProps
});
export class AxiosLoading {
  loadingCount: number;

  constructor() {
    this.loadingCount = 0;
  }

  addLoading() {
    if (this.loadingCount === 0) {
      loading.show();
    }
    this.loadingCount++;
  }

  closeLoading() {
    if (this.loadingCount > 0) {
      this.loadingCount--;
      if (this.loadingCount === 0) {
        loading.hide();
      }
    }
  }
}
