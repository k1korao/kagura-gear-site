"use client";

import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./AlbumArtwork.module.css";

const ALT = {
  en: "KIKORA Cover study with the original lime K and kunai emblem on purple",
  ja: "パープルを背景に、ライム色の K とクナイのオリジナルロゴを配した KIKORA Cover コンセプト",
};

export function AlbumArtwork({ priority = false }: { edition: number; priority?: boolean }) {
  const locale = useLocale();
  return <div className={styles.artwork}>
    <Image src="/brand/kikora-kunai-icon.svg" alt={ALT[locale]} fill sizes="(max-width: 760px) 85vw, 55vw" priority={priority} draggable={false} className={styles.emblem} />
  </div>;
}
