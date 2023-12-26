import { useLoading } from '@/hooks';
import { LoadingEnum } from '@/enum';
const loading = useLoading({
  spin: LoadingEnum.CHASE,
  minTime: 500
});

export class AxiosLoading {
  loadingCount: number;

  constructor() {
    this.loadingCount = 0;
  }

  addLoading() {
    if (this.loadingCount === 0) {
      loading.open();
    }
    this.loadingCount++;
  }

  closeLoading() {
    if (this.loadingCount > 0) {
      if (this.loadingCount === 1) {
        loading.close();
      }
      this.loadingCount--;
    }
  }
}
