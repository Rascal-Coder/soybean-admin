/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export function setupMock(isBuild: boolean) {
  return viteMockServe({
    mockPath: 'src/mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
    import { setupProdMockServer } from './_mockProdServer';

    setupProdMockServer();
  `
  });
}
