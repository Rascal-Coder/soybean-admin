import compression from 'vite-plugin-compression';

export const setupCompression = (env: ImportMetaEnv) => {
  const plugin = [];
  const { VITE_BUILD_COMPRESS } = env;
  const compressList = VITE_BUILD_COMPRESS.split(',');
  if (compressList.includes('gz')) {
    plugin.push(
      compression({
        ext: '.gz',
        deleteOriginFile: false
      })
    );
  }
  if (compressList.includes('br')) {
    plugin.push(
      compression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: false
      })
    );
  }
  return plugin;
};
