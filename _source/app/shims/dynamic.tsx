import { useEffect, useState, type ComponentType } from "react";
const pending: Promise<void>[] = [];
export async function warmDynamicImports() { await Promise.all(pending); }
export default function dynamic<T extends object>(loader: () => Promise<ComponentType<T> | { default: ComponentType<T> }>, options: { ssr?: boolean; loading?: ComponentType } = {}) {
  let Component: ComponentType<T> | undefined;
  const promise = loader().then(loaded => { Component = "default" in loaded ? loaded.default : loaded; });
  pending.push(promise);
  const Fallback = options.loading;
  return function DynamicComponent(props: T) {
    const [ready, setReady] = useState(Boolean(Component));
    useEffect(() => { let active = true; promise.then(() => { if (active) setReady(true); }); return () => { active = false; }; }, []);
    return ready && Component ? <Component {...props} /> : Fallback ? <Fallback /> : null;
  };
}
