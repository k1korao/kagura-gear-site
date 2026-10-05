declare global {
  interface Window {
    KIKORA_ASSETS?: Record<string, string>;
    KIKORA_PAGE?: { route?: string; locale?: string; title?: string; prerendered?: boolean };
  }
  var __KIKORA_ASSETS__: Record<string, string> | undefined;
  var __KIKORA_LOCALE__: string | undefined;
}
export function assetUrl(path: string) {
  const assets = typeof window !== "undefined" ? window.KIKORA_ASSETS : globalThis.__KIKORA_ASSETS__;
  return assets?.[path] || path;
}
