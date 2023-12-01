import zhCN from './lang/zh-CN';
import enUS from './lang/en-US';

const locales: Record<App.I18n.LangType, App.I18n.Schema> = {
  'zh-CN': zhCN,
  'en-US': enUS
};

export default locales;
