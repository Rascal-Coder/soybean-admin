/**
 * default theme settings
 */
export const themeSettings: App.Theme.ThemeSetting = {
  themeScheme: 'light',
  themeColor: '#646cff',
  otherColor: {
    info: '#2080f0',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  },
  isInfoFollowPrimary: true,
  layout: {
    mode: 'vertical',
    scrollMode: 'content'
  },
  page: {
    animate: true,
    animateMode: 'fade-slide'
  },
  header: {
    height: 56,
    breadcrumb: {
      visible: true,
      showIcon: true
    }
  },
  tab: {
    visible: true,
    cache: true,
    height: 44,
    mode: 'chrome'
  },
  fixedHeaderAndTab: true,
  sider: {
    inverted: false,
    width: 220,
    collapsedWidth: 64,
    mixWidth: 90,
    mixCollapsedWidth: 64,
    mixChildMenuWidth: 200
  },
  footer: {
    visible: true,
    fixed: false,
    height: 48,
    dates: '2023-11',
    company: 'soybean-admin',
    website: 'https://github.com/honghuangdc/soybean-admin',
    right: true
  }
};

/**
 * override theme settings
 * @description if publish new version, use `overrideThemeSettings` to override certain theme settings
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {};
