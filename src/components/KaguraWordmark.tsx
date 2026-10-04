import styles from "./KaguraWordmark.module.css";

export function KaguraWordmark({ className = "" }: { className?: string }) {
  return (
    <svg className={`${styles.wordmark} ${className}`} viewBox="0 0 306 40" role="img" aria-label="KAGURA" focusable="false">
      <path d="M0 0h9v15h6L29 0h12L23 19l20 21H30L15 25H9v15H0Z" />
      <path fillRule="evenodd" d="M49 40 63 0h15l14 40H81l-3-10H62l-3 10Zm16-18h10L70 8Z" />
      <path d="M112 0h34v9h-31l-4 4v14l4 4h22v-6h-11v-8h21v23h-36l-10-10V10Z" />
      <path d="M157 0h9v27l4 4h14l4-4V0h9v31l-9 9h-22l-9-9Z" />
      <path fillRule="evenodd" d="M208 0h30l10 10v10l-8 8 10 12h-12l-11-12h-10v12h-9Zm9 9v11h17l4-4v-3l-4-4Z" />
      <path fillRule="evenodd" d="m260 40 14-40h15l14 40h-11l-3-10h-16l-3 10Zm16-18h10l-5-14Z" />
    </svg>
  );
}
