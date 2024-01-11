import type { Directive, App, DirectiveBinding } from 'vue';
import { usePermission } from '@/hooks';
function isAuth(el: Element, permission: string[] | string) {
  const { hasPermission } = usePermission();
  if (!permission) {
    throw new Error(`need roles: like v-permission="'admin'", v-permission="['admin', 'test]"`);
  }
  if (!hasPermission(permission)) {
    el.parentNode?.removeChild(el);
  }
}

const permissionDirective: Directive<HTMLElement, Business.Auth.RoleType[]> = {
  mounted(el: Element, binding: DirectiveBinding<any>) {
    isAuth(el, binding.value);
  },
  updated(el: Element, binding: DirectiveBinding<any>) {
    isAuth(el, binding.value);
  }
};

export const setupPermissionDirective = (app: App) => {
  app.directive('permission', permissionDirective);
};
