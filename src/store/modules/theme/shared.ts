import { getColorPalette } from '@sa/color-palette';
import { getRgbOfColor, darken, lighten } from '@sa/utils';
import { themeSettings, overrideThemeSettings } from '@/theme/settings';
import { themeVars } from '@/theme/vars';
import { localStg } from '@/utils/storage';
// import { useThemeStore } from '@/store/modules/theme';
const DARK_CLASS = 'dark';
// const themeStore = useThemeStore();

/**
 * init theme settings
 * @param darkMode is dark mode
 */
export function initThemeSettings() {
  const isProd = import.meta.env.PROD;
  // if it is development mode, the theme settings will not be cached, by update `themeSettings` in `src/theme/settings.ts` to update theme settings
  if (!isProd) return themeSettings;

  // if it is production mode, the theme settings will be cached in localStorage
  // if want to update theme settings when publish new version, please update `overrideThemeSettings` in `src/theme/settings.ts`

  const settings = localStg.get('themeSettings') || themeSettings;

  const isOverride = localStg.get('overrideThemeFlag') === __BUILD_TIME__;

  if (!isOverride) {
    Object.assign(settings, overrideThemeSettings);
    localStg.set('overrideThemeFlag', __BUILD_TIME__);
  }

  return settings;
}

/**
 * create theme token
 * @param darkMode is dark mode
 */
export function createThemeToken(colors: App.Theme.ThemeColor) {
  const paletteColors = createThemePaletteColors(colors);

  const themeTokens: App.Theme.ThemeToken = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      container: 'rgb(255, 255, 255)',
      layout: 'rgb(247, 250, 252)',
      inverted: 'rgb(0, 20, 40)',
      base_text: 'rgb(31, 31, 31)',
      scrollbar: '#909399'
    },
    boxShadow: {
      header: '0 1px 2px rgb(0, 21, 41, 0.08)',
      sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
      tab: '0 1px 2px rgb(0, 21, 41, 0.08)'
    }
  };

  const darkThemeTokens: App.Theme.ThemeToken = {
    colors: {
      ...themeTokens.colors,
      container: 'rgb(28, 28, 28)',
      layout: 'rgb(18, 18, 18)',
      base_text: 'rgb(224, 224, 224)',
      scrollbar: '#A3A6AD'
    },
    boxShadow: {
      ...themeTokens.boxShadow
    }
  };

  return {
    themeTokens,
    darkThemeTokens
  };
}

/**
 * create theme palette colors
 * @param colors theme colors
 */
function createThemePaletteColors(colors: App.Theme.ThemeColor) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[];
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colorKeys.forEach(key => {
    const { palettes, main } = getColorPalette(colors[key], key);

    colorPaletteVar[key] = main.hexcode;

    palettes.forEach(item => {
      colorPaletteVar[`${key}-${item.number}`] = item.hexcode;
    });
  });

  return colorPaletteVar;
}

/**
 * get css var by tokens
 * @param tokens theme base tokens
 */
function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  const styles: string[] = [];

  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '');
  }

  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '');
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue);
      let cssValue = tokens[key][tokenKey];

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey);
        const { r, g, b } = getRgbOfColor(cssValue);
        cssValue = `${r} ${g} ${b}`;
      }

      styles.push(`${cssVarsKey}: ${cssValue}`);
    }
  }

  const styleStr = styles.join(';');

  return styleStr;
}

/**
 * add theme vars to html
 * @param tokens
 */
export function addThemeVarsToHtml(tokens: App.Theme.BaseToken, darkTokens: App.Theme.BaseToken) {
  const cssVarStr = getCssVarByTokens(tokens);
  const darkCssVarStr = getCssVarByTokens(darkTokens);

  const css = `
    html {
      ${cssVarStr}
    }
  `;

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr}
    `;

  const style = document.createElement('style');

  style.innerText = css + darkCss;

  document.head.appendChild(style);
}

/**
 * toggle css dark mode
 * @param darkMode
 */
export function toggleCssDarkMode(darkMode = false) {
  function addDarkClass() {
    document.documentElement.classList.add(DARK_CLASS);
  }

  function removeDarkClass() {
    document.documentElement.classList.remove(DARK_CLASS);
  }

  if (darkMode) {
    addDarkClass();
  } else {
    removeDarkClass();
  }
}
function setProperty(
  mode: 'dark' | 'light',
  type: string,
  {
    i,
    color,
    isDark
  }: {
    i: number;
    color: string;
    isDark: boolean;
  }
) {
  document.documentElement.style.setProperty(
    `--el-color-${type}-${mode}-${i}`,
    isDark ? darken(color, i / 10) : lighten(color, i / 10)
  );
}

/** 设置 `element-plus` 主题色 */
export const setEpThemeColor = (type: string, color: string, isDark: boolean) => {
  document.documentElement.style.setProperty(`--el-color-${type}`, color);
  for (let i = 1; i <= 2; i++) {
    setProperty('dark', type, {
      i,
      color,
      isDark
    });
  }
  for (let i = 1; i <= 9; i++) {
    setProperty('light', type, {
      i,
      color,
      isDark
    });
  }
};
