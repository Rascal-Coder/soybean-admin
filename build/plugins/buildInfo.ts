import { readdir, stat } from 'fs';
import type { Plugin } from 'vite';
import type { Dayjs } from 'dayjs';
import dayjs, { extend } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import pkg from 'picocolors';

const { green, blue, bold } = pkg;
extend(duration);
const APP_TITLE = '[SoybeanAdmin]';
const staticPath = 'dist';
const fileListTotal: number[] = [];
const recursiveDirectory = (folder: string, callback: () => void): void => {
  readdir(folder, (err, files: string[]) => {
    if (err) throw err;
    let count = 0;
    const checkEnd = () => {
      ++count === files.length && callback();
    };
    files.forEach((item: string) => {
      stat(`${folder}/${item}`, async (errnoException, stats) => {
        if (errnoException) throw errnoException;
        if (stats.isFile()) {
          fileListTotal.push(stats.size);
          checkEnd();
        } else if (stats.isDirectory()) {
          recursiveDirectory(`${folder}/${item}/`, checkEnd);
        }
      });
    });
    files.length === 0 && callback();
  });
};

const sum = (arr: number[]) => {
  return arr.reduce((t: number, c: number) => {
    return t + c;
  }, 0);
};
const formatBytes = (a: number, b?: number): string => {
  if (a === 0) return '0 Bytes';
  const c = 1024;
  const d = b || 2;
  const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const f = Math.floor(Math.log(a) / Math.log(c));
  return `${parseFloat((a / c ** f).toFixed(d))} ${e[f]}`;
};

export const setupBuildInfo = (): Plugin => {
  let config: { command: string };
  let startTime: Dayjs;
  let endTime: Dayjs;
  return {
    name: 'vite:buildInfo',
    configResolved(resolvedConfig: { command: string }) {
      config = resolvedConfig;
    },
    buildStart() {
      // eslint-disable-next-line no-console
      console.log(
        bold(green(`👏欢迎使用 ${blue(APP_TITLE)}，现在正全力为您${config.command === 'build' ? '打包' : '编译'}`))
      );
      if (config.command === 'build') {
        startTime = dayjs(new Date());
      }
    },
    closeBundle() {
      if (config.command === 'build') {
        endTime = dayjs(new Date());
        recursiveDirectory(staticPath, () => {
          // eslint-disable-next-line no-console
          console.log(
            bold(
              green(
                `恭喜打包完成🎉（总用时${dayjs
                  .duration(endTime.diff(startTime))
                  .format('mm分ss秒')}，打包后的大小为${formatBytes(sum(fileListTotal))}）`
              )
            )
          );
        });
      }
    }
  };
};
