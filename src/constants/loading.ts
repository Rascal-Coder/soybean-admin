import type { Props } from '@rascoder/vue-loading';
export const loadersList = [
  'RotateSquare',
  'RotateSquare2',
  'RotateSquare3',
  'RotateSquare4',
  'RotateSquare5',
  'CubeShadow',
  'Grid',
  'Stretch',
  'Circle',
  'LetterCube'
];
export const defaultLoadingProps: Props = {
  color: 'var(--el-color-primary)',
  backgroundColor: '#4b4b4b',
  height: 64,
  width: 64,
  loader: 'RotateSquare2',
  opacity: 0.3,
  lockScroll: true,
  canCancel: true
};
