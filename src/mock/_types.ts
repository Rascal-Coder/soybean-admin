/** mock的响应option */
export interface MockOption {
  url: Record<string, any>;
  body: Record<string, any>;
  query: Record<string, any>;
  headers: Record<string, any>;
}
