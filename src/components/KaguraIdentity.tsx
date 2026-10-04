import { KaguraSymbol } from "./KaguraSymbol";
import { KaguraWordmark } from "./KaguraWordmark";
import styles from "./KaguraIdentity.module.css";
export function KaguraIdentity({ compact = false }: { compact?: boolean }) {
  return <span className={`${styles.identity} ${compact ? styles.compact : ""}`}><KaguraSymbol className={styles.symbol} /><span className={styles.word}><KaguraWordmark /></span></span>;
}
