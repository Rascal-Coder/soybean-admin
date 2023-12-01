import { ref, computed, effectScope, onScopeDispose, watch, toRefs } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { usePreferredColorScheme, useEventListener } from '@vueuse/core';
import { SetupStoreId } from '@/enum';
import { localStg } from '@/utils/storage';
import { createThemeToken, initThemeSettings, addThemeVarsToHtml, toggleCssDarkMode, getNaiveTheme } from './shared';

/**
 * theme store
 */
export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = effectScope();
  const osTheme = usePreferredColorScheme();

  /**
   * theme settings
   */
  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings());

  /**
   * dark mode
   */
  const darkMode = computed(() => {
    if (settings.value.themeScheme === 'auto') {
      return osTheme.value === 'dark';
    }

    return settings.value.themeScheme === 'dark';
  });

  /**
   * theme colors
   */
  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = settings.value;
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info
    };
    return colors;
  });

  /**
   * naive theme
   */
  const naiveTheme = computed(() => getNaiveTheme(themeColors.value));

  /**
   * settings json
   * @description it is for copy settings
   */
  const settingsJson = computed(() => JSON.stringify(settings.value));

  /**
   * reset store
   */
  function resetStore() {
    const themeStore = useThemeStore();

    themeStore.$reset();
  }

  /**
   * set theme scheme
   * @param themeScheme
   */
  function setThemeScheme(themeScheme: UnionKey.ThemeScheme) {
    settings.value.themeScheme = themeScheme;
  }

  /**
   * toggle theme scheme
   */
  function toggleThemeScheme() {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto'];

    const currentThemeScheme = settings.value.themeScheme;

    const currentIndex = themeSchemes.findIndex(item => item === currentThemeScheme);

    const targgetIndex = (currentIndex + 1) % themeSchemes.length;

    const targgetThemeScheme = themeSchemes[targgetIndex];

    setThemeScheme(targgetThemeScheme);
  }

  /**
   * update theme colors
   * @param key theme color key
   * @param color theme color
   */
  function updateThemeColors(key: App.Theme.ThemeColorKey, color: string) {
    if (key === 'primary') {
      settings.value.themeColor = color;
    } else {
      settings.value.otherColor[key] = color;
    }
  }

  /**
   * set theme layout
   * @param mode theme layout mode
   */
  function setThemeLayout(mode: UnionKey.ThemeLayoutMode) {
    settings.value.layout.mode = mode;
  }

  /**
   * setup theme vars to html
   */
  function setupThemeVarsToHtml() {
    const { themeTokens, darkThemeTokens } = createThemeToken(themeColors.value);
    addThemeVarsToHtml(themeTokens, darkThemeTokens);
  }

  /**
   * cache theme settings
   */
  function cacheThemeSettings() {
    const isProd = import.meta.env.PROD;

    if (!isProd) return;

    localStg.set('themeSettings', settings.value);
  }

  // cache theme settings when page is closed or refreshed
  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings();
  });

  // watch store
  scope.run(() => {
    // watch dark mode

    /**
     * watch dark mode
     * themeColors change, update css vars
     */
    watch(
      [darkMode, themeColors],
      ([darkModeVal, themeColorsVal], [prevDarkModeVal, prevThemeColorsVal]) => {
        if (darkModeVal !== prevDarkModeVal) {
          toggleCssDarkMode(darkModeVal);
        }
        if (themeColorsVal !== prevThemeColorsVal) {
          setupThemeVarsToHtml();
        }
      },
      { immediate: true }
    );
  });

  /**
   * on scope dispose
   */
  onScopeDispose(() => {
    scope.stop();
  });

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    naiveTheme,
    settingsJson,
    resetStore,
    setThemeScheme,
    toggleThemeScheme,
    updateThemeColors,
    setThemeLayout
  };
});
