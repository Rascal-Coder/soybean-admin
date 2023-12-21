interface Window {
  /**
   * NProgress instance
   */
  NProgress?: import('nprogress').NProgress;
}

interface ViewTransition {
  ready: Promise<void>;
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition;
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}

/**
 * build time of the project
 */
declare const __BUILD_TIME__: string;
