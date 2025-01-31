import type { GeneratedRoute } from '@elegant-router/types';
export const routeModel: Record<Business.Auth.RoleType, GeneratedRoute[]> = {
  super: [
    {
      name: 'home',
      path: '/home',
      component: 'layout.base$view.home',
      meta: {
        title: 'home',
        i18nKey: 'route.home',
        icon: 'mdi:monitor-dashboard',
        order: 1
      }
    },
    {
      name: 'auth-demo',
      path: '/auth-demo',
      component: 'layout.base',
      meta: {
        title: 'auth-demo',
        i18nKey: 'route.auth-demo',
        icon: 'ic:baseline-security',
        order: 5
      },
      children: [
        {
          name: 'auth-demo_permission',
          path: '/auth-demo/permission',
          component: 'view.auth-demo_permission',
          meta: {
            title: 'auth-demo_permission',
            i18nKey: 'route.auth-demo_permission',
            icon: 'ic:round-construction'
          }
        },
        {
          name: 'auth-demo_super',
          path: '/auth-demo/super',
          component: 'view.auth-demo_super',
          meta: {
            title: 'auth-demo_super',
            i18nKey: 'route.auth-demo_super',
            roles: ['super'],
            icon: 'ic:round-supervisor-account'
          }
        }
      ]
    },
    {
      name: 'exception',
      path: '/exception',
      component: 'layout.base',
      meta: {
        title: 'exception',
        i18nKey: 'route.exception',
        order: 4,
        icon: 'ant-design:exception-outlined'
      },
      children: [
        {
          name: 'exception_403',
          path: '/exception/403',
          component: 'view.exception_403',
          meta: {
            title: 'exception_403',
            i18nKey: 'route.exception_403',
            icon: 'ic:baseline-block',
            order: 1
          }
        },
        {
          name: 'exception_404',
          path: '/exception/404',
          component: 'view.exception_404',
          meta: {
            title: 'exception_404',
            i18nKey: 'route.exception_404',
            icon: 'ic:baseline-web-asset-off',
            order: 2
          }
        },
        {
          name: 'exception_500',
          path: '/exception/500',
          component: 'view.exception_500',
          meta: {
            title: 'exception_500',
            i18nKey: 'route.exception_500',
            icon: 'ic:baseline-wifi-off',
            order: 3
          }
        }
      ]
    },
    {
      name: 'function',
      path: '/function',
      component: 'layout.base',
      meta: {
        title: 'function',
        i18nKey: 'route.function',
        icon: 'icon-park-outline:all-application',
        order: 6
      },
      children: [
        {
          name: 'function_axios',
          path: '/function/axios',
          component: 'view.function_axios',
          meta: {
            title: 'function_axios',
            i18nKey: 'route.function_axios',
            icon: 'simple-icons:axios'
          }
        },
        {
          name: 'function_loading',
          path: '/function/loading',
          component: 'view.function_loading',
          meta: {
            title: 'function_loading',
            i18nKey: 'route.function_loading',
            icon: 'uiw:loading'
          }
        }
      ]
    },
    {
      name: 'document',
      path: '/document',
      component: 'layout.base',
      meta: {
        title: 'document',
        i18nKey: 'route.document',
        icon: 'mdi:file-document-multiple-outline',
        order: 7
      },
      children: [
        {
          name: 'document_element-plus',
          path: '/document/element-plus',
          component: 'view.document_element-plus',
          meta: {
            title: 'document_element-plus',
            i18nKey: 'route.document_element-plus',
            icon: 'logos:element',
            order: 1
          }
        },
        {
          name: 'document_project-link',
          path: '/document/project-link',
          component: 'view.document_project-link',
          meta: {
            title: 'document_project-link',
            i18nKey: 'route.document_project-link',
            localIcon: 'logo',
            href: 'https://admin-docs.soybeanjs.cn/',
            order: 2
          }
        },
        {
          name: 'document_vite',
          path: '/document/vite',
          component: 'view.document_vite',
          meta: {
            title: 'document_vite',
            i18nKey: 'route.document_vite',
            icon: 'logos:vitejs',
            order: 3
          }
        },
        {
          name: 'document_vue',
          path: '/document/vue',
          component: 'view.document_vue',
          meta: {
            title: 'document_vue',
            i18nKey: 'route.document_vue',
            icon: 'logos:vue',
            order: 4
          }
        }
      ]
    },
    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'layout.base',
      meta: {
        title: 'multi-menu',
        i18nKey: 'route.multi-menu',
        order: 8,
        icon: 'mdi:menu'
      },
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          meta: {
            title: 'multi-menu_first',
            i18nKey: 'route.multi-menu_first',
            order: 1,
            icon: 'mdi:menu'
          },
          children: [
            {
              name: 'multi-menu_first_child',
              path: '/multi-menu/first/child',
              component: 'view.multi-menu_first_child',
              meta: {
                title: 'multi-menu_first_child',
                i18nKey: 'route.multi-menu_first_child',
                order: 1,
                icon: 'mdi:menu'
              }
            }
          ]
        },
        {
          name: 'multi-menu_second',
          path: '/multi-menu/second',
          meta: {
            title: 'multi-menu_second',
            i18nKey: 'route.multi-menu_second',
            order: 2,
            icon: 'mdi:menu'
          },
          children: [
            {
              name: 'multi-menu_second_child',
              path: '/multi-menu/second/child',
              meta: {
                title: 'multi-menu_second_child',
                i18nKey: 'route.multi-menu_second_child',
                order: 1,
                icon: 'mdi:menu'
              },
              children: [
                {
                  name: 'multi-menu_second_child_home',
                  path: '/multi-menu/second/child/home',
                  component: 'view.multi-menu_second_child_home',
                  meta: {
                    title: 'multi-menu_second_child_home',
                    i18nKey: 'route.multi-menu_second_child_home',
                    order: 1,
                    icon: 'mdi:menu'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'manage',
      path: '/manage',
      component: 'layout.base',
      meta: {
        title: 'manage',
        i18nKey: 'route.manage',
        icon: 'carbon:cloud-service-management',
        order: 9
      },
      children: [
        {
          name: 'manage_role',
          path: '/manage/role',
          component: 'view.manage_role',
          meta: {
            title: 'manage_role',
            i18nKey: 'route.manage_role',
            icon: 'carbon:user-role',
            order: 2
          }
        },
        {
          name: 'manage_route',
          path: '/manage/route',
          component: 'view.manage_route',
          meta: {
            title: 'manage_route',
            i18nKey: 'route.manage_route',
            icon: 'material-symbols:route',
            order: 3,
            keepAlive: true
          }
        },
        {
          name: 'manage_user',
          path: '/manage/user',
          component: 'view.manage_user',
          meta: {
            title: 'manage_user',
            i18nKey: 'route.manage_user',
            icon: 'ic:round-manage-accounts',
            order: 1
          }
        },
        {
          name: 'manage_user-detail',
          path: '/manage/user-detail/:id',
          component: 'view.manage_user-detail',
          props: true,
          meta: {
            title: 'manage_user-detail',
            i18nKey: 'route.manage_user-detail',
            hideInMenu: true,
            activeMenu: 'manage_user'
          }
        }
      ]
    },
    {
      name: 'user-center',
      path: '/user-center',
      component: 'layout.base$view.user-center',
      meta: {
        title: 'user-center',
        i18nKey: 'route.user-center',
        hideInMenu: true
      }
    }
  ],
  admin: [
    {
      name: 'home',
      path: '/home',
      component: 'layout.base$view.home',
      meta: {
        title: 'home',
        i18nKey: 'route.home',
        icon: 'mdi:monitor-dashboard',
        order: 1
      }
    },

    {
      name: 'exception',
      path: '/exception',
      component: 'layout.base',
      meta: {
        title: 'exception',
        i18nKey: 'route.exception',
        order: 5,
        icon: 'ant-design:exception-outlined'
      },
      children: [
        {
          name: 'exception_403',
          path: '/exception/403',
          component: 'view.exception_403',
          meta: {
            title: 'exception_403',
            i18nKey: 'route.exception_403',
            icon: 'ic:baseline-block',
            order: 1
          }
        },
        {
          name: 'exception_404',
          path: '/exception/404',
          component: 'view.exception_404',
          meta: {
            title: 'exception_404',
            i18nKey: 'route.exception_404',
            icon: 'ic:baseline-web-asset-off',
            order: 2
          }
        },
        {
          name: 'exception_500',
          path: '/exception/500',
          component: 'view.exception_500',
          meta: {
            title: 'exception_500',
            i18nKey: 'route.exception_500',
            icon: 'ic:baseline-wifi-off',
            order: 3
          }
        }
      ]
    },
    {
      name: 'function',
      path: '/function',
      component: 'layout.base',
      meta: {
        title: 'function',
        i18nKey: 'route.function',
        icon: 'icon-park-outline:all-application',
        order: 6
      },
      children: [
        {
          name: 'function_axios',
          path: '/function/axios',
          component: 'view.function_axios',
          meta: {
            title: 'function_axios',
            i18nKey: 'route.function_axios',
            icon: 'simple-icons:axios'
          }
        },
        {
          name: 'function_loading',
          path: '/function/loading',
          component: 'view.function_loading',
          meta: {
            title: 'function_loading',
            i18nKey: 'route.function_loading',
            icon: 'uiw:loading'
          }
        }
      ]
    },
    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'layout.base',
      meta: {
        title: 'multi-menu',
        i18nKey: 'route.multi-menu',
        order: 8,
        icon: 'mdi:menu'
      },
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          meta: {
            title: 'multi-menu_first',
            i18nKey: 'route.multi-menu_first',
            order: 1,
            icon: 'mdi:menu'
          },
          children: [
            {
              name: 'multi-menu_first_child',
              path: '/multi-menu/first/child',
              component: 'view.multi-menu_first_child',
              meta: {
                title: 'multi-menu_first_child',
                i18nKey: 'route.multi-menu_first_child',
                order: 1,
                icon: 'mdi:menu'
              }
            }
          ]
        },
        {
          name: 'multi-menu_second',
          path: '/multi-menu/second',
          meta: {
            title: 'multi-menu_second',
            i18nKey: 'route.multi-menu_second',
            order: 2,
            icon: 'mdi:menu'
          },
          children: [
            {
              name: 'multi-menu_second_child',
              path: '/multi-menu/second/child',
              meta: {
                title: 'multi-menu_second_child',
                i18nKey: 'route.multi-menu_second_child',
                order: 1,
                icon: 'mdi:menu'
              },
              children: [
                {
                  name: 'multi-menu_second_child_home',
                  path: '/multi-menu/second/child/home',
                  component: 'view.multi-menu_second_child_home',
                  meta: {
                    title: 'multi-menu_second_child_home',
                    i18nKey: 'route.multi-menu_second_child_home',
                    order: 1,
                    icon: 'mdi:menu'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'user-center',
      path: '/user-center',
      component: 'layout.base$view.user-center',
      meta: {
        title: 'user-center',
        i18nKey: 'route.user-center',
        hideInMenu: true
      }
    }
  ],
  user: [
    {
      name: 'home',
      path: '/home',
      component: 'layout.base$view.home',
      meta: {
        title: 'home',
        i18nKey: 'route.home',
        icon: 'mdi:monitor-dashboard',
        order: 1
      }
    },
    {
      name: 'exception',
      path: '/exception',
      component: 'layout.base',
      meta: {
        title: 'exception',
        i18nKey: 'route.exception',
        order: 5,
        icon: 'ant-design:exception-outlined'
      },
      children: [
        {
          name: 'exception_403',
          path: '/exception/403',
          component: 'view.exception_403',
          meta: {
            title: 'exception_403',
            i18nKey: 'route.exception_403',
            icon: 'ic:baseline-block',
            order: 1
          }
        },
        {
          name: 'exception_404',
          path: '/exception/404',
          component: 'view.exception_404',
          meta: {
            title: 'exception_404',
            i18nKey: 'route.exception_404',
            icon: 'ic:baseline-web-asset-off',
            order: 2
          }
        },
        {
          name: 'exception_500',
          path: '/exception/500',
          component: 'view.exception_500',
          meta: {
            title: 'exception_500',
            i18nKey: 'route.exception_500',
            icon: 'ic:baseline-wifi-off',
            order: 3
          }
        }
      ]
    },
    {
      name: 'document',
      path: '/document',
      component: 'layout.base',
      meta: {
        title: 'document',
        i18nKey: 'route.document',
        icon: 'mdi:file-document-multiple-outline',
        order: 7
      },
      children: [
        {
          name: 'document_element-plus',
          path: '/document/element-plus',
          component: 'view.document_element-plus',
          meta: {
            title: 'document_element-plus',
            i18nKey: 'route.document_element-plus',
            icon: 'logos:element',
            order: 1
          }
        },
        {
          name: 'document_project-link',
          path: '/document/project-link',
          component: 'view.document_project-link',
          meta: {
            title: 'document_project-link',
            i18nKey: 'route.document_project-link',
            localIcon: 'logo',
            href: 'https://admin-docs.soybeanjs.cn/',
            order: 2
          }
        },
        {
          name: 'document_vite',
          path: '/document/vite',
          component: 'view.document_vite',
          meta: {
            title: 'document_vite',
            i18nKey: 'route.document_vite',
            icon: 'logos:vitejs',
            order: 3
          }
        },
        {
          name: 'document_vue',
          path: '/document/vue',
          component: 'view.document_vue',
          meta: {
            title: 'document_vue',
            i18nKey: 'route.document_vue',
            icon: 'logos:vue',
            order: 4
          }
        }
      ]
    },
    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'layout.base',
      meta: {
        title: 'multi-menu',
        i18nKey: 'route.multi-menu',
        order: 8,
        icon: 'mdi:menu'
      },
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          meta: {
            title: 'multi-menu_first',
            i18nKey: 'route.multi-menu_first',
            order: 1,
            icon: 'mdi:menu'
          },
          children: [
            {
              name: 'multi-menu_first_child',
              path: '/multi-menu/first/child',
              component: 'view.multi-menu_first_child',
              meta: {
                title: 'multi-menu_first_child',
                i18nKey: 'route.multi-menu_first_child',
                order: 1,
                icon: 'mdi:menu'
              }
            }
          ]
        },
        {
          name: 'multi-menu_second',
          path: '/multi-menu/second',
          meta: {
            title: 'multi-menu_second',
            i18nKey: 'route.multi-menu_second',
            order: 2,
            icon: 'mdi:menu'
          },
          children: [
            {
              name: 'multi-menu_second_child',
              path: '/multi-menu/second/child',
              meta: {
                title: 'multi-menu_second_child',
                i18nKey: 'route.multi-menu_second_child',
                order: 1,
                icon: 'mdi:menu'
              },
              children: [
                {
                  name: 'multi-menu_second_child_home',
                  path: '/multi-menu/second/child/home',
                  component: 'view.multi-menu_second_child_home',
                  meta: {
                    title: 'multi-menu_second_child_home',
                    i18nKey: 'route.multi-menu_second_child_home',
                    order: 1,
                    icon: 'mdi:menu'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
