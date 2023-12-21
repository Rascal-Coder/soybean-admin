import { visualizer } from 'rollup-plugin-visualizer';
export const setupVisualizer = () => {
  return visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
    filename: 'report.html'
  });
};
