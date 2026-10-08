import { KaguraWordmark } from "./KaguraWordmark";
import styles from "./MonochromePadSurface.module.css";

export function MonochromePadSurface({ tone = "white", className = "" }: { tone?: "white" | "black"; className?: string }) {
  return <div className={`${styles.surface} ${className}`} data-tone={tone}>
    <KaguraWordmark className={styles.mark} />
  </div>;
}
