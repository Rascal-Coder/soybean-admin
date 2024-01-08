import type { MockMethod } from 'vite-plugin-mock';
import { routeModel, userModel } from './model';
import type { MockOption } from './_types';
import { resultSuccess } from './_utils';
import type { GeneratedRoute } from '@elegant-router/types';
import { sortRoutes } from '@/utils/common';
export default [
  {
    url: '/mock/getUserRoutes',
    method: 'post',
    response: (options: MockOption) => {
      const { userId = undefined } = options.body;

      const routeHomeName = 'home';

      const userRoles = userModel.find(item => item.userId === userId)?.roles || ['user'];
      const filterRoutes = Array.from(
        new Set(userRoles.flatMap(role => routeModel[role as Business.Auth.RoleType]))
      ).reduce<GeneratedRoute[]>((uniqueRoutes, route) => {
        // 保证按照 path 的唯一性
        if (!uniqueRoutes.some(r => r.path === route.path)) {
          uniqueRoutes.push(route);
        }
        return uniqueRoutes;
      }, []);

      const data = {
        routes: sortRoutes(filterRoutes),
        home: routeHomeName
      };
      return resultSuccess(data);
    }
  }
] as MockMethod[];
