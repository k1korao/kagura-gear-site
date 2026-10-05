/** Two suspended folds leave an open interval; tonal faces suggest depth. */
export function KaguraSymbol({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="8 4 112 112" aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M18 52 64 22 108 39 89 52 66 43 38 61 38 90 18 82Z" />
    <path d="M66 76 90 60 110 68 66 97Z" opacity=".55" />
    <path d="M48 69v21l18 7v-21Z" opacity=".83" />
  </svg>;
}
