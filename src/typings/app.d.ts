/**
 * the global namespace for the app
 */

declare namespace App {
  /**
   * theme namespace
   */
  namespace Theme {
    type ColorPaletteNumber = import('@sa/color-palette').ColorPaletteNumber;

    /**
     * theme token
     */
    type ThemeToken = {
      colors: ThemeTokenColor;
      boxShadow: {
        header: string;
        sider: string;
        tab: string;
      };
    };

    /**
     * theme setting
     */
    interface ThemeSetting {
      /**
       * theme scheme
       */
      themeScheme: UnionKey.ThemeScheme;
      /**
       * theme color
       */
      themeColor: string;
      /**
       * other color
       */
      otherColor: OtherColor;
      /**
       * whether info color is followed by the primary color
       */
      isInfoFollowPrimary: boolean;
      /**
       * layout
       */
      layout: {
        /**
         * layout mode
         */
        mode: UnionKey.ThemeLayoutMode;
        /**
         * scroll mode
         */
        scrollMode: UnionKey.ThemeScrollMode;
      };
      /**
       * page
       */
      page: {
        /**
         * whether to show the page transition
         */
        animate: boolean;
        /**
         * page animate mode
         */
        animateMode: UnionKey.ThemePageAnimateMode;
      };
      /**
       * header
       */
      header: {
        /**
         * header height
         */
        height: number;
        /**
         * header breadcrumb
         */
        breadcrumb: {
          /**
           * whether to show the breadcrumb
           */
          visible: boolean;
          /**
           * whether to show the breadcrumb icon
           */
          showIcon: boolean;
        };
      };
      /**
       * tab
       */
      tab: {
        /**
         * whether to show the tab
         */
        visible: boolean;
        /**
         * whether to cache the tab
         * @description if cache, the tabs will get from the local storage when the page is refreshed
         */
        cache: boolean;
        /**
         * tab height
         */
        height: number;
        /**
         * tab mode
         */
        mode: UnionKey.ThemeTabMode;
      };
      /**
       * fixed header and tab
       */
      fixedHeaderAndTab: boolean;
      /**
       * sider
       */
      sider: {
        /**
         * inverted sider
         */
        inverted: boolean;
        /**
         * sider width
         */
        width: number;
        /**
         * collapsed sider width
         */
        collapsedWidth: number;
        /**
         * sider width when the layout is 'vertical-mix' or 'horizontal-mix'
         */
        mixWidth: number;
        /**
         * collapsed sider width when the layout is 'vertical-mix' or 'horizontal-mix'
         */
        mixCollapsedWidth: number;
        /**
         * child menu width when the layout is 'vertical-mix' or 'horizontal-mix'
         */
        mixChildMenuWidth: number;
      };
      /**
       * footer
       */
      footer: {
        /**
         * whether to show the footer
         */
        visible: boolean;
        /**
         * whether fixed the footer
         */
        fixed: boolean;
        /**
         * footer height
         */
        height: number;
        /**
         * whether float the footer to the right when the layout is 'horizontal-mix'
         */
        right: boolean;
        /**
         * footer dates
         */
        dates: string;
        /**
         * footer company
         */
        company: string;
        /**
         * footer website
         */
        website: string;
      };
    }

    interface OtherColor {
      info: string;
      success: string;
      warning: string;
      error: string;
    }

    interface ThemeColor extends OtherColor {
      primary: string;
    }

    type ThemeColorKey = keyof ThemeColor;

    type CombinedThemeColorKey = ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`;

    type ThemePaletteColor = {
      [key in CombinedThemeColorKey]: string;
    };

    type BaseToken = Record<string, Record<string, string>>;

    interface ThemeTokenColor extends ThemePaletteColor {
      nprogress: string;
      container: string;
      layout: string;
      inverted: string;
      base_text: string;
      scrollbar: string;
      [key: string]: string;
    }
  }

  /**
   * global namespace
   */
  namespace Global {
    type VNode = import('vue').VNode;
    type RouteLocationNormalizedLoaded = import('vue-router').RouteLocationNormalizedLoaded;
    type RouteKey = import('@elegant-router/types').RouteKey;
    type RouteMap = import('@elegant-router/types').RouteMap;
    type RoutePath = import('@elegant-router/types').RoutePath;
    type LastLevelRouteKey = import('@elegant-router/types').LastLevelRouteKey;
    type RouteMeta = import('vue-router').RouteMeta;
    /**
     * the global header props
     */
    interface HeaderProps {
      /**
       * whether to show the logo
       */
      showLogo?: boolean;
      /**
       * whether to show the menu toggler
       */
      showMenuToggler?: boolean;
      /**
       * whether to show the menu
       */
      showMenu?: boolean;
    }

    /**
     * the global menu
     */
    interface Menu {
      /**
       * the menu key
       * @description equal to the route key
       */
      key: string;
      /**
       * the menu label
       */
      label: string;
      /**
       * the menu i18n key
       */
      i18nKey?: I18n.I18nKey;
      /**
       * the route key
       */
      routeKey: RouteKey;
      /**
       * the route path
       */
      routePath: RoutePath;
      /**
       * the menu icon
       */
      icon?: () => VNode;
      /**
       * the menu children
       */
      children?: Menu[];

      meta?: RouteMeta;
    }

    type Breadcrumb = Omit<Menu, 'children'> & {
      options?: Breadcrumb[];
    };

    /**
     * tab route
     */
    type TabRoute = Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> &
      Partial<Pick<RouteLocationNormalizedLoaded, 'fullPath' | 'query'>>;

    /**
     * the global tab
     */
    type Tab = {
      /**
       * the tab id
       */
      id: string;
      /**
       * the tab label
       */
      label: string;
      /**
       * the new tab label
       * @description if set, the tab label will be replaced by this value
       */
      newLabel?: string;
      /**
       * the tab route key
       */
      routeKey: LastLevelRouteKey;
      /**
       * the tab route path
       */
      routePath: RouteMap[LastLevelRouteKey];
      /**
       * the tab route full path
       */
      fullPath: string;
      /**
       * the tab fixed index
       */
      fixedIndex?: number;
      /**
       * tab icon
       * @description iconify icon
       */
      icon?: string;
      /**
       * tab local icon
       * @description local icon
       */
      localIcon?: string;
      /**
       * i18n key
       */
      i18nKey?: I18n.I18nKey;
    };

    /**
     * the global dropdown key
     */
    type DropdownKey = 'closeCurrent' | 'closeOther' | 'closeLeft' | 'closeRight' | 'closeAll';

    /**
     * the global form rule
     */
    type FormRule = import('element-plus').FormItemRule;
  }

  /**
   * i18n namespace
   * @description locales type
   */
  namespace I18n {
    type RouteKey = import('@elegant-router/types').RouteKey;

    type LangType = 'en-US' | 'zh-CN';

    type LangOption = {
      label: string;
      key: LangType;
    };

    type I18nRouteKey = Exclude<RouteKey, 'root' | 'not-found'>;

    type FormMsg = {
      required: string;
      invalid: string;
    };

    type Schema = {
      system: {
        title: string;
      };
      common: {
        tip: string;
        add: string;
        addSuccess: string;
        edit: string;
        editSuccess: string;
        delete: string;
        deleteSuccess: string;
        batchDelete: string;
        confirm: string;
        cancel: string;
        pleaseCheckValue: string;
        action: string;
        backToHome: string;
        lookForward: string;
        userCenter: string;
        logout: string;
        logoutConfirm: string;
      };
      theme: {
        themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>;
        layoutMode: { title: string } & Record<UnionKey.ThemeLayoutMode, string>;
        themeColor: {
          title: string;
          followPrimary: string;
        } & Theme.ThemeColor;
        scrollMode: { title: string } & Record<UnionKey.ThemeScrollMode, string>;
        page: {
          animate: string;
          mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
        };
        fixedHeaderAndTab: string;
        header: {
          height: string;
          breadcrumb: {
            visible: string;
            showIcon: string;
          };
        };
        tab: {
          visible: string;
          cache: string;
          height: string;
          mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
        };
        sider: {
          inverted: string;
          width: string;
          collapsedWidth: string;
          mixWidth: string;
          mixCollapsedWidth: string;
          mixChildMenuWidth: string;
        };
        footer: {
          visible: string;
          fixed: string;
          height: string;
          right: string;
          dates: string;
          company: string;
          website: string;
        };
        themeDrawerTitle: string;
        pageFunTitle: string;
        configOperation: {
          copyConfig: string;
          copySuccessMsg: string;
          resetConfig: string;
          resetSuccessMsg: string;
        };
      };
      route: Record<I18nRouteKey, string>;
      page: {
        login: {
          common: {
            loginOrRegister: string;
            userNamePlaceholder: string;
            phonePlaceholder: string;
            codePlaceholder: string;
            passwordPlaceholder: string;
            confirmPasswordPlaceholder: string;
            codeLogin: string;
            confirm: string;
            back: string;
            validateSuccess: string;
            loginSuccess: string;
            welcomeBack: string;
          };
          pwdLogin: {
            title: string;
            rememberMe: string;
            forgetPassword: string;
            register: string;
            otherAccountLogin: string;
            otherLoginMode: string;
            superAdmin: string;
            admin: string;
            user: string;
          };
          codeLogin: {
            title: string;
            getCode: string;
            imageCodePlaceholder: string;
          };
          register: {
            title: string;
            agreement: string;
            protocol: string;
            policy: string;
          };
          resetPwd: {
            title: string;
          };
          bindWeChat: {
            title: string;
          };
        };
      };
      form: {
        userName: FormMsg;
        phone: FormMsg;
        pwd: FormMsg;
        code: FormMsg;
        email: FormMsg;
      };

      dropdown: Record<Global.DropdownKey, string>;
      icon: {
        themeConfig: string;
        themeSchema: string;
        lang: string;
        fullscreen: string;
        fullscreenExit: string;
        reload: string;
        collapse: string;
        expand: string;
        pin: string;
        unpin: string;
      };
    };

    type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
      ? T[K] extends Record<string, unknown>
        ? `${K}.${GetI18nKey<T[K]>}`
        : K
      : never;

    type I18nKey = GetI18nKey<Schema>;

    type TranslateOptions<Locales extends string> = import('vue-i18n').TranslateOptions<Locales>;

    interface $T {
      (key: I18nKey): string;
      (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], plural: number): string;
      (key: I18nKey, list: unknown[], defaultMsg: string): string;
      (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, named: Record<string, unknown>, plural: number): string;
      (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string;
    }
  }

  /**
   * service namespace
   */
  namespace Service {
    /**
     * the backend service env type
     */
    type EnvType = 'dev' | 'test' | 'prod';

    /**
     * the backend service config
     */
    interface ServiceConfig {
      /**
       * the backend service base url
       */
      baseURL: string;
      /**
       * other backend service base url map
       */
      otherBaseURL: Record<string, string>;
    }

    /**
     * the backend service config map
     */
    type ServiceConfigMap = Record<EnvType, ServiceConfig>;

    /**
     * the backend service response data
     */
    type Response<T = unknown> = {
      /**
       * the backend service response code
       */
      code: string;
      /**
       * the backend service response message
       */
      msg: string;
      /**
       * the backend service response data
       */
      data: T;
    };
    /** 后端接口返回的数据结构配置 */
    interface BackendResultConfig {
      /** 表示后端请求状态码的属性字段 */
      codeKey: string;
      /** 表示后端请求数据的属性字段 */
      dataKey: string;
      /** 表示后端消息的属性字段 */
      msgKey: string;
      /** 后端业务上定义的成功请求的状态 */
      successCode: number | string;
    }
    /**
     * 请求的错误类型：
     * - axios: axios错误：网络错误, 请求超时, 默认的兜底错误
     * - http: 请求成功，响应的http状态码非200的错误
     * - backend: 请求成功，响应的http状态码为200，由后端定义的业务错误
     */
    type RequestErrorType = 'axios' | 'http' | 'backend';
    /** 请求错误 */
    interface RequestError {
      /** 请求服务的错误类型 */
      type: RequestErrorType;
      /** 错误码 */
      code: string | number;
      /** 错误信息 */
      msg: string;
    }
    /** 自定义的请求成功结果 */
    interface SuccessResult<T = any> {
      /** 请求错误 */
      error: null;
      /** 请求数据 */
      data: T;
    }

    /** 自定义的请求失败结果 */
    interface FailedResult {
      /** 请求错误 */
      error: RequestError;
      /** 请求数据 */
      data: null;
    }
    /** 自定义的请求结果 */
    type RequestResult<T = any> = SuccessResult<T> | FailedResult;

    /** 多个请求数据结果 */
    type MultiRequestResult<T extends any[]> = T extends [infer First, ...infer Rest]
      ? [First] extends [any]
        ? Rest extends any[]
          ? [Service.RequestResult<First>, ...MultiRequestResult<Rest>]
          : [Service.RequestResult<First>]
        : Rest extends any[]
          ? MultiRequestResult<Rest>
          : []
      : [];
    /** 请求结果的适配器函数 */
    type ServiceAdapter<T = any, A extends any[] = any> = (...args: A) => T;
    /** 扩展的请求配置 */
    interface RequestConfigExtra {
      cancelSame?: boolean;
      retryCount?: number;
      loading?: boolean;
      errorMessage?: boolean;
      successMessage?: boolean;
    }
    type ExtraAxiosRequestConfig = import('axios').InternalAxiosRequestConfig & App.Service.RequestConfigExtra;
  }
}
