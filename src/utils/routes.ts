import type { ElegantConstRoute } from '@elegant-router/types';
/**
 * sort routes
 * @param routes auth routes
 */
export function sortRoutes(routes: ElegantConstRoute[]) {
  routes.sort(cb);

  routes.forEach(item => {
    if (item.children) {
      sortRoutes(item.children);
    }
  });
  function cb(a: ElegantConstRoute, b: ElegantConstRoute) {
    const orderA = a.meta?.order || Number.POSITIVE_INFINITY;
    const orderB = b.meta?.order || Number.POSITIVE_INFINITY;
    return orderA - orderB;
  }
  return routes;
}
