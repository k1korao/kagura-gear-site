import { useId } from "react";

/** Original non-letter emblem: two cut orbits, an open core and opposing facets. */
export function KaguraSymbol({ className = "" }: { className?: string }) {
  const cutId = useId();
  return <svg className={className} viewBox="0 0 128 128" aria-hidden="true" focusable="false" fill="currentColor">
    <defs><mask id={cutId} maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
      <rect width="128" height="128" fill="white" />
      <path d="m65 34 12 18 22 12-22 12-12 18-13-18-23-12 23-12Z" fill="black" stroke="black" strokeWidth="7" />
      <path d="m82 33 17 7 8 11-12 7-9-13-14-7Z" fill="black" stroke="black" strokeWidth="6" />
      <path d="m46 95-17-7-8-11 12-7 9 13 14 7Z" fill="black" stroke="black" strokeWidth="6" />
    </mask></defs>
    <g mask={`url(#${cutId})`}><path d="M5 59 24 24 65 7 105 16 123 40 98 31 66 24 39 37 28 57 45 63 29 78Z" /><path d="m123 69-19 35-41 17-40-9L5 88l25 9 32 7 27-13 11-20-17-6 16-15Z" /></g>
    <path fillRule="evenodd" d="m65 34 12 18 22 12-22 12-12 18-13-18-23-12 23-12Zm0 18L52 64l13 12 12-12Z" />
    <path d="m82 33 17 7 8 11-12 7-9-13-14-7Z" /><path d="m46 95-17-7-8-11 12-7 9 13 14 7Z" />
  </svg>;
}
