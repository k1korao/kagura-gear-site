import { KaguraWordmark } from "./KaguraWordmark";
import styles from "./KaguraIdentity.module.css";
export function KaguraIdentity({ compact = false }: { compact?: boolean }) {
  return <span className={`${styles.identity} ${compact ? styles.compact : ""}`}><KaguraWordmark className={styles.word} /></span>;
}
