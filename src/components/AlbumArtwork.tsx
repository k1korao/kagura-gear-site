import Image from "next/image";

const artwork = [
  { image: "reyna", title: "STARPLAYER.", caption: "REYNA / CHARACTER REMIX CONCEPT 001", alt: "Reyna fan art in violet light against a vivid red album-cover background" },
  { image: "wraith", title: "VOID FM.", caption: "WRAITH / CHARACTER REMIX CONCEPT 002", alt: "Wraith fan art in a cold blue science-fiction album-cover composition" },
  { image: "chemist", title: "THE CHEMIST.", caption: "CAUSTIC / CINEMATIC REMIX CONCEPT 003", alt: "Caustic sitting in an industrial warehouse with olive green barrels and warm cinematic backlight" },
];

export function AlbumArtwork({ edition, priority = false }: { edition: number; priority?: boolean }) {
  const cover = artwork[edition] ?? artwork[0];
  return <div className={`album-art-image album-art-${cover.image}`}>
    <Image src={`/images/album-concept-${cover.image}.webp`} alt={cover.alt} fill sizes="(max-width: 760px) 85vw, 55vw" priority={priority} draggable={false} />
    <span className="album-art-title">{cover.title}</span>
    <span className="album-art-caption">{cover.caption}</span>
  </div>;
}
