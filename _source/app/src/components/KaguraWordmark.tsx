import styles from "./KaguraWordmark.module.css";

export function KaguraWordmark({ className = "" }: { className?: string }) {
  return (
    <svg className={`${styles.wordmark} ${className}`} viewBox="0 0 306 40" role="img" aria-label="KIKORA" focusable="false">
      <path d="M0 0h9v15h6L29 0h12L23 19l20 21H30L15 25H9v15H0Z" />
      <path d="M66 0h9v40h-9Z" />
      <path d="M101 0h9v15h6l14-15h12L124 19l20 21h-13L116 25h-6v15h-9Z" />
      <path fillRule="evenodd" d="M167 0h22l10 10v20l-10 10h-22l-10-10V10Zm4 9-5 5v12l5 5h14l5-5V14l-5-5Z" />
      <path fillRule="evenodd" d="M208 0h30l10 10v10l-8 8 10 12h-12l-11-12h-10v12h-9Zm9 9v11h17l4-4v-3l-4-4Z" />
      <path fillRule="evenodd" d="m260 40 14-40h15l14 40h-11l-3-10h-16l-3 10Zm16-18h10l-5-14Z" />
    </svg>
  );
}
