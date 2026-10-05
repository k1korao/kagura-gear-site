import { forwardRef, type CSSProperties, type ImgHTMLAttributes } from "react";
import { assetUrl } from "../runtime/assets";
type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string | { src: string; width?: number; height?: number }; fill?: boolean; priority?: boolean; quality?: number; unoptimized?: boolean; placeholder?: string; blurDataURL?: string };
const Image = forwardRef<HTMLImageElement, Props>(function Image({ src, fill, priority, quality: _quality, unoptimized: _unoptimized, placeholder: _placeholder, blurDataURL: _blur, style, loading, ...props }, ref) {
  const path = typeof src === "string" ? src : src.src;
  const fillStyle: CSSProperties = fill ? { position: "absolute", height: "100%", width: "100%", inset: 0, color: "transparent" } : {};
  return <img {...props} ref={ref} src={assetUrl(path)} style={{ ...fillStyle, ...style }} loading={priority ? "eager" : loading || "lazy"} decoding="async" fetchPriority={priority ? "high" : undefined} />;
});
export default Image;
