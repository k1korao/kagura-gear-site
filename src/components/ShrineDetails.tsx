"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./ShrineDetails.module.css";
import { AlbumArtwork } from "./AlbumArtwork";

type Tab = "specs" | "story" | "faq";
type ShrineDetailsProps = {
  open: boolean;
  onClose: () => void;
  kind: "glass" | "keycaps" | "metal";
  collection?: "core" | "artist" | "covers";
  edition?: number;
};

const tabs: { id: Tab; label: string }[] = [
  { id: "specs", label: "Specs" },
  { id: "story", label: "Story" },
  { id: "faq", label: "FAQ" },
];

const concepts = {
  core: {
    title: "Core glass", index: "01 / GLASS — CORE", tagline: "A clear starting point. Quiet by design.",
    asideTitle: "Focus on the essentials.", description: "A restrained direction for the KAGURA glass mousepad. Form, proportion, and a clear visual identity.",
    storyTitle: "Room for what matters.", story: "Core explores the simplest expression of a glass mousepad: a quiet surface and an intentional presence on the desk. The shape shown is a design study; construction and final specifications remain in development.",
    caption: "Core / form study", question: "What defines the Core direction?", answer: "Core explores a restrained visual design. The charcoal finish shown is a concept; final finish and construction are still to be confirmed.",
  },
  artist: {
    title: "Artist editions", index: "01 / GLASS — ARTIST", tagline: "A different perspective, made part of your desk.",
    asideTitle: "Make room for expression.", description: "Original visual studies exploring color, composition, and the surface of a glass mousepad.",
    storyTitle: "The surface as a canvas.", story: "Artist editions explores expressive artwork as part of an everyday object. The blue composition shown is an original abstract study. Final editions, participating artists, and product specifications have not been announced.",
    caption: "Artist / abstract study", question: "Is this an announced artist collaboration?", answer: "This is an original abstract design study for the Artist direction. No specific artist collaboration or final edition has been announced.",
  },
  covers: {
    title: "Cover series", index: "01 / GLASS — COVERS", tagline: "One artwork. One edition. A new way to set the tone.",
    asideTitle: "Set your own tone.", description: "Album-inspired visual editions for your desk. One artwork at a time.",
    storyTitle: "A surface with its own sound.", story: "Each Cover series mousepad is conceived as its own edition: one artwork, one visual identity. Music and album design guide the atmosphere, while final artwork and production specifications are still in development.",
    caption: "Covers / artwork study", question: "What does a Cover edition mean?", answer: "One artwork defines each edition. The direction draws on music and album visuals; the artwork shown here is a concept study, not an announced official collaboration.",
  },
  keycaps: {
    title: "Keycaps", index: "02 / KEYCAPS", tagline: "Reyna. Red light. A different kind of record.",
    asideTitle: "A new point of contact.", description: "Character art, reimagined across individual keycaps. A visual companion to the Starplayer glass edition.",
    storyTitle: "One artwork. Across every key.", story: "The Cover series brings the atmosphere of a record sleeve to your keyboard. Reyna artwork is composed across individual keycap tops, framed by charcoal modifiers. This is an independent character remix concept, with no official collaboration implied. Materials, printing methods, profiles, and compatibility are still to be confirmed.",
    caption: "Keycaps / printed artwork study", question: "Which keyboards will the keycaps fit?", answer: "Layout compatibility, keycap profile, and kit contents have not been announced. The image illustrates a design direction rather than a final kit.",
  },
  metal: {
    title: "Metal customs", index: "03 / METAL CUSTOMS", tagline: "An exploration of geometry, weight, and detail.",
    asideTitle: "A future in the details.", description: "Custom metal objects are a future direction for KAGURA. This keycap form is an early geometric study.",
    storyTitle: "A small object. A strong presence.", story: "Metal customs is a future product direction exploring sculptural shapes and individual details for the desk. The keycap shape shown is a concept. Material grades, finishes, manufacturing processes, compatibility, and timing have not been confirmed.",
    caption: "Metal / geometric study", question: "Is this metal keycap available?", answer: "Metal customs is a future plan. This geometric keycap is a form study; specifications, availability, and pricing have not been announced.",
  },
};

export function ShrineDetails({ open, onClose, kind, collection = "core", edition = 0 }: ShrineDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  const backdropPointerDown = useRef(false);
  const [activeTab, setActiveTab] = useState<Tab>("specs");
  const id = useId();
  const isGlass = kind === "glass";
  const isCovers = isGlass && collection === "covers";
  const isMetal = kind === "metal";
  const concept = concepts[isGlass ? collection : kind];
  const title = concept.title;
  const specifications = isGlass ? [
    ["Category", "Glass mousepad"],
    ["Collection", title],
    ["Design dimensions", "490 × 420 mm"],
    ["Thickness", "To be confirmed"],
    ["Surface & base", "To be confirmed"],
    ["Status", "In development"],
  ] : isMetal ? [
    ["Direction", "Metal customs"],
    ["Preview", "Geometric keycap form study"],
    ["Materials & finish", "To be confirmed"],
    ["Compatibility", "To be confirmed"],
    ["Status", "Future plan"],
  ] : [
    ["Palette study", "Crimson / Violet / Charcoal"],
    ["Materials & process", "To be confirmed"],
    ["Profile & kit", "To be confirmed"],
    ["Compatibility", "To be confirmed"],
    ["Status", "In development"],
  ];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const previousFocus = document.activeElement;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      const padding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [open]);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, current: Tab) {
    const index = tabs.findIndex((tab) => tab.id === current);
    let nextIndex: number;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    const next = tabs[nextIndex].id;
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  }

  function isOutsideDialog(clientX: number, clientY: number) {
    const bounds = dialogRef.current?.getBoundingClientRect();
    return bounds
      ? clientX < bounds.left || clientX > bounds.right || clientY < bounds.top || clientY > bounds.bottom
      : false;
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        backdropPointerDown.current = event.target === event.currentTarget
          && isOutsideDialog(event.clientX, event.clientY);
      }}
      onClick={(event) => {
        if (backdropPointerDown.current && event.target === event.currentTarget
          && isOutsideDialog(event.clientX, event.clientY)) onClose();
        backdropPointerDown.current = false;
      }}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>KAGURA / Product notes</span>
          <button type="button" className={styles.close} onClick={onClose} autoFocus aria-label="Close product details">
            <span className={styles.closeText}>Close</span>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
          </button>
        </header>

        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.intro}>
              <p className={styles.index}>{concept.index}</p>
              <h2 id={`${id}-title`}>{title}</h2>
              <p>{concept.tagline}</p>
            </div>

            {isGlass ? (
              <figure className={styles.visual}>
                <div className={`${styles.glassPad} ${collection === "core" ? styles.corePad : collection === "artist" ? styles.artistPad : ""}`} aria-hidden="true">
                  {isCovers ? <AlbumArtwork edition={edition} /> : collection === "artist" ? <><span className={styles.artistOrbit} /><span className={styles.artistPlane} /><span className={styles.padMark}>KAGURA / ARTIST</span></> : <><span className={styles.coreSheen} /><span className={styles.padMark}>KAGURA / CORE</span></>}
                </div>
                <figcaption>{concept.caption}<span>{isCovers ? "490 × 420 mm design" : "Design concept"}</span></figcaption>
              </figure>
            ) : isMetal ? (
              <figure className={`${styles.visual} ${styles.metalVisual}`}>
                <div className={styles.metalObject} aria-hidden="true"><div className={styles.metalFace}><span>K</span><i /></div></div>
                <span className={styles.conceptBadge}>Future plan</span>
                <figcaption>{concept.caption}<span>Specifications to be confirmed</span></figcaption>
              </figure>
            ) : (
              <figure className={`${styles.visual} ${styles.keysVisual}`}>
                <Image src="/images/kagura-keycaps-cover.webp" alt="KAGURA Reyna artwork concept printed across individual red and violet keycaps" fill sizes="(max-width: 760px) 100vw, 60vw" className={styles.keycapsImage} />
                <span className={styles.conceptBadge}>Concept / In development</span>
                <figcaption>{concept.caption}<span>Layout and profile to be confirmed</span></figcaption>
              </figure>
            )}

            <div className={styles.tabList} role="tablist" aria-label={`${title} information`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  ref={(node) => { tabRefs.current[tab.id] = node; }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${tab.id}`}
                  aria-controls={`${id}-panel-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
                >
                  {tab.label}<span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>

            <section
              role="tabpanel"
              id={`${id}-panel-specs`}
              aria-labelledby={`${id}-tab-specs`}
              hidden={activeTab !== "specs"}
              tabIndex={0}
              className={styles.panel}
            >
              <p className={styles.panelLead}>{isMetal ? "An early look at what comes next." : "The details are in development."}</p>
              <dl className={styles.specs}>{specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
              <p className={styles.specNote}>Final specifications, pricing, and release timing will be shared as development progresses.</p>
            </section>

            <section
              role="tabpanel"
              id={`${id}-panel-story`}
              aria-labelledby={`${id}-tab-story`}
              hidden={activeTab !== "story"}
              tabIndex={0}
              className={styles.panel}
            >
              <p className={styles.panelLead}>{concept.storyTitle}</p>
              <p>{concept.story}</p>
              <p className={styles.storySignoff}>KAGURA / Objects for your everyday.</p>
            </section>

            <section
              role="tabpanel"
              id={`${id}-panel-faq`}
              aria-labelledby={`${id}-tab-faq`}
              hidden={activeTab !== "faq"}
              tabIndex={0}
              className={`${styles.panel} ${styles.faq}`}
            >
              <details open><summary>{concept.question}</summary><p>{concept.answer}</p></details>
              <details><summary>What are the confirmed specifications?</summary><p>{isGlass ? "The design dimensions are 490 × 420 mm. Glass thickness, surface finish, and base construction are still to be confirmed." : "The current preview communicates a design direction. Final materials, dimensions, construction, and compatibility have not been announced."}</p></details>
              <details><summary>How can I hear about the release?</summary><p>{isMetal ? "Metal customs is a future plan." : "This product direction is in development."} Pricing and release timing have not been announced. Visit the <Link href="/#newsletter" onClick={onClose}>release newsletter</Link> for future updates.</p></details>
            </section>
          </div>

          <aside className={styles.aside} aria-label="Product overview">
            <span className={styles.eyebrow}>KAGURA / {title}</span>
            <h3>{concept.asideTitle}</h3>
            <p className={styles.asideDescription}>{concept.description}</p>
            {isCovers ? <div className={styles.summaryRow}><span>Design dimensions</span><strong>490 × 420 mm</strong></div> : null}
            <div className={styles.status}><span aria-hidden="true" />{isMetal ? "Future plan" : "In development"}</div>
            <p className={styles.releaseNote}>Specs to be confirmed. Release details to come.</p>
            <Link href="/#newsletter" onClick={onClose} className={styles.primaryLink}>Get release updates<span aria-hidden="true">↗</span></Link>
            <div className={styles.asideFooter}><span>KAGURA</span><span>Your desk.<br />Your own expression.</span></div>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
