/**
 * transform record to option
 * @param record
 * @example
 * ```ts
 * const record = {
 *   key1: 'label1',
 *   key2: 'label2'
 * };
 * const options = transformRecordToOption(record);
 * // [
 * //   { value: 'key1', label: 'label1' },
 * //   { value: 'key2', label: 'label2' }
 * // ]
 * ```
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as Common.Option<keyof T>[];
}
/**
 * 加载网络css文件
 * @param url css资源url
 */
export function loadCss(url: string): void {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.getElementsByTagName('head')[0].appendChild(link);
}

/**
 * 加载网络js文件
 * @param url js资源url
 */
export function loadJs(url: string): void {
  const link = document.createElement('script');
  link.src = url;
  document.body.appendChild(link);
}
