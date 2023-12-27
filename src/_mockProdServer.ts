import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const mocks: any[] = [];
const mockContext = import.meta.glob('./mock/*.ts', { eager: true });
Object.keys(mockContext).forEach(v => {
  const mockModule = (mockContext[v] as any).default;
  if (mockModule) {
    mocks.push(...mockModule);
  }
});

export function setupProdMockServer() {
  createProdMockServer(mocks);
}
