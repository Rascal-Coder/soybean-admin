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
export function transformedData(data: Array<string>) {
  return data.map(item => ({
    label: item,
    value: item
  }));
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
/**
 * 策略模式
 * @param actions 每一种可能执行的操作
 */
export function exeStrategyActions(actions: Common.StrategyAction[]) {
  actions.some(item => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
}
/**
 * 排除掉obj里面的key值
 * @param obj
 * @param  args
 * @returns
 */
export function omit<T extends Record<string, any>, P extends keyof T>(obj: T, args: string | string[]) {
  if (!args) return obj;
  const newObj = {} as Omit<T, P>;
  const isString = typeof args === 'string';
  const keys = Object.keys(obj).filter(item => {
    if (isString) {
      return item !== args;
    }
    return !(<P[]>args).includes(item as P);
  }) as Exclude<keyof T, P>[];

  keys.forEach(key => {
    if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
}
