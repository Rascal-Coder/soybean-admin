import { useAuthStore } from '@/store/modules/auth';
import { isString, isArray } from '@sa/utils';
/** 权限判断 */
export function usePermission() {
  const authStore = useAuthStore();
  function hasPermission(permission: string[] | string) {
    const { permissions } = authStore.userInfo;
    let has;
    if (isArray(permission)) {
      permissions.forEach(authPermission => {
        has = permission.every(per => per === authPermission);
      });
    }
    if (isString(permission)) {
      has = permissions.includes(permission);
    }
    return has;
  }

  return {
    hasPermission
  };
}
