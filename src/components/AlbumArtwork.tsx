"use client";

import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import { coverEditions, productCopy } from "@/lib/product-copy";

export function AlbumArtwork({ edition, priority = false }: { edition: number; priority?: boolean }) {
  const locale = useLocale();
  const cover = coverEditions[edition] ?? coverEditions[0];
  const copy = productCopy[locale].artwork[edition] ?? productCopy[locale].artwork[0];
  return <div className={`album-art-image album-art-${cover.id}`}>
    <Image src={`/images/album-concept-${cover.id}.webp`} alt={copy.alt} fill sizes="(max-width: 760px) 85vw, 55vw" priority={priority} draggable={false} />
    <span className="album-art-title">{cover.title}</span>
    <span className="album-art-caption">{copy.caption}</span>
  </div>;
}
