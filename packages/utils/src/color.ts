import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import mixPlugin from 'colord/plugins/mix';
import type { AnyColor, HsvColor, RgbColor } from 'colord';
import { getRgb, getHex } from '@sa/color-palette';
extend([namesPlugin, mixPlugin]);

/**
 * add color alpha
 * @param color - color
 * @param alpha - alpha (0 - 1)
 */
export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex();
}

/**
 * mix color
 * @param firstColor - first color
 * @param secondColor - second color
 * @param ratio - the ratio of the second color (0 - 1)
 */
export function mixColor(firstColor: string, secondColor: string, ratio: number) {
  return colord(firstColor).mix(secondColor, ratio).toHex();
}

/**
 * transform color with opacity to similar color without opacity
 * @param color - color
 * @param alpha - alpha (0 - 1)
 * @param bgColor background color (usually white or black)
 */
export function transformColorWithOpacity(color: string, alpha: number, bgColor = '#ffffff') {
  const originColor = addColorAlpha(color, alpha);
  const { r: oR, g: oG, b: oB } = colord(originColor).toRgb();

  const { r: bgR, g: bgG, b: bgB } = colord(bgColor).toRgb();

  function calRgb(or: number, bg: number, al: number) {
    return bg + (or - bg) * al;
  }

  const resultRgb: RgbColor = {
    r: calRgb(oR, bgR, alpha),
    g: calRgb(oG, bgG, alpha),
    b: calRgb(oB, bgB, alpha)
  };

  return colord(resultRgb).toHex();
}

/**
 * is white color
 * @param color - color
 */
export function isWhiteColor(color: string) {
  return colord(color).isEqual('#ffffff');
}

/**
 * get rgb of color
 * @param color color
 */
export function getRgbOfColor(color: string) {
  return colord(color).toRgb();
}

/**
 * hue step
 */
const hueStep = 2;
/**
 * saturation step, light color part
 */
const saturationStep = 16;
/**
 * saturation step, dark color part
 */
const saturationStep2 = 5;
/**
 * brightness step, light color part
 */
const brightnessStep1 = 5;
/**
 * brightness step, dark color part
 */
const brightnessStep2 = 15;
/**
 * light color count, main color up
 */
const lightColorCount = 5;
/**
 * dark color count, main color down
 */
const darkColorCount = 4;

/**
 * the color index of color palette
 * @description from left to right, the color is from light to dark, 6 is main color
 */
type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * get color palette (from left to right, the color is from light to dark, 6 is main color)
 * @param color - color
 * @param index - the color index of color palette (the main color index is 6)
 * @returns hex color
 */
export function getColorPalette(color: AnyColor, index: ColorIndex): string {
  const transformColor = colord(color);

  if (!transformColor.isValid()) {
    throw Error('invalid input color value');
  }

  if (index === 6) {
    return colord(transformColor).toHex();
  }

  const isLight = index < 6;
  const hsv = transformColor.toHsv();
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;

  const newHsv: HsvColor = {
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight)
  };

  return colord(newHsv).toHex();
}

/**
 * map of dark color index and opacity
 */
const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 }
];

/**
 * get color palettes
 * @param color - color
 * @param darkTheme - dark theme
 * @param darkThemeMixColor - dark theme mix color (default: #141414)
 */
export function getColorPalettes(color: AnyColor, darkTheme = false, darkThemeMixColor = '#141414'): string[] {
  const indexes: ColorIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const patterns = indexes.map(index => getColorPalette(color, index));

  if (darkTheme) {
    const darkPatterns = darkColorMap.map(({ index, opacity }) => {
      const darkColor = colord(darkThemeMixColor).mix(patterns[index], opacity);

      return darkColor;
    });

    return darkPatterns.map(item => colord(item).toHex());
  }

  return patterns;
}

/**
 * get hue
 * @param hsv - hsv format color
 * @param i - the relative distance from 6
 * @param isLight - is light color
 */
function getHue(hsv: HsvColor, i: number, isLight: boolean) {
  let hue: number;

  const hsvH = Math.round(hsv.h);

  if (hsvH >= 60 && hsvH <= 240) {
    hue = isLight ? hsvH - hueStep * i : hsvH + hueStep * i;
  } else {
    hue = isLight ? hsvH + hueStep * i : hsvH - hueStep * i;
  }

  if (hue < 0) {
    hue += 360;
  }

  if (hue >= 360) {
    hue -= 360;
  }

  return hue;
}

/**
 * get saturation
 * @param hsv - hsv format color
 * @param i - the relative distance from 6
 * @param isLight - is light color
 */
function getSaturation(hsv: HsvColor, i: number, isLight: boolean) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }

  let saturation: number;

  if (isLight) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }

  if (saturation > 100) {
    saturation = 100;
  }

  if (isLight && i === lightColorCount && saturation > 10) {
    saturation = 10;
  }

  if (saturation < 6) {
    saturation = 6;
  }

  return saturation;
}

/**
 * get value of hsv
 * @param hsv - hsv format color
 * @param i - the relative distance from 6
 * @param isLight - is light color
 */
function getValue(hsv: HsvColor, i: number, isLight: boolean) {
  let value: number;

  if (isLight) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }

  if (value > 100) {
    value = 100;
  }

  return value;
}

// 函数参数 level 默认值为 0
export function darken(color: string, level: number = 0): string {
  const { r, g, b } = getRgb(color);
  function rgbToString(_r: number, _g: number, _b: number) {
    return `rgb(${Math.floor(_r * (1 - level))},${Math.floor(_g * (1 - level))},${Math.floor(_b * (1 - level))})`;
  }
  const rgbStr = rgbToString(r, g, b);
  return getHex(rgbStr);
}

// 函数参数 level 默认值为 0
export function lighten(color: string, level: number = 0): string {
  const { r, g, b } = getRgb(color);
  function rgbToString(_r: number, _g: number, _b: number) {
    return `rgb(${Math.floor((255 - _r) * level + _r)},${Math.floor((255 - _g) * level + _g)},${Math.floor(
      (255 - _b) * level + _b
    )})`;
  }
  const rgbStr = rgbToString(r, g, b);
  return getHex(rgbStr);
}
