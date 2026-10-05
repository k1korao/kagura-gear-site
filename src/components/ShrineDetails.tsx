"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./ShrineDetails.module.css";
import { AlbumArtwork } from "./AlbumArtwork";
import { useLocale } from "@/components/LocaleProvider";
import { productCopy } from "@/lib/product-copy";

type Tab = "specs" | "story" | "faq";
type ShrineDetailsProps = {
  open: boolean;
  onClose: () => void;
  kind: "glass" | "keycaps" | "metal";
  collection?: "core" | "artist" | "covers";
  edition?: number;
};

export function ShrineDetails({ open, onClose, kind, collection = "core", edition = 0 }: ShrineDetailsProps) {
  const locale = useLocale();
  const copy = productCopy[locale];
  const text = copy.details;
  const tabs = (["specs", "story", "faq"] as const).map(id => ({ id, label: text.tabs[id] }));
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  const backdropPointerDown = useRef(false);
  const [activeTab, setActiveTab] = useState<Tab>("specs");
  const id = useId();
  const isGlass = kind === "glass";
  const isCovers = isGlass && collection === "covers";
  const isMetal = kind === "metal";
  const concept = copy.concepts[isGlass ? collection : kind];
  const editionName = copy.editionNames[edition] ?? copy.editionNames[0];
  const title = isCovers ? editionName : concept.title;
  const specifications = isGlass ? [
    [text.category, copy.categories.glass],
    [text.collection, concept.title],
    ...(isCovers ? [[text.edition, editionName]] : []),
    [text.dimensions, "490 × 420 mm"],
    [text.thickness, text.tbc],
    [text.surface, text.tbc],
    [text.status, copy.experience.developing],
  ] : isMetal ? [
    [text.direction, copy.categories.metal],
    [text.preview, text.geometric],
    [text.materialsFinish, text.tbc],
    [text.compatibility, text.tbc],
    [text.status, text.future],
  ] : [
    [text.palette, text.colors],
    [text.materialsProcess, text.tbc],
    [text.profileKit, text.tbc],
    [text.compatibility, text.tbc],
    [text.status, copy.experience.developing],
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
          <span className={styles.eyebrow}>{text.notes}</span>
          <button type="button" className={styles.close} onClick={onClose} autoFocus aria-label={text.closeLabel}>
            <span className={styles.closeText}>{text.close}</span>
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
                  {isCovers ? <AlbumArtwork edition={edition} /> : collection === "artist" ? <><span className={styles.artistOrbit} /><span className={styles.artistPlane} /><span className={styles.padMark}>KIKORA / ARTIST</span></> : <><span className={styles.coreSheen} /><span className={styles.padMark}>KIKORA / CORE</span></>}
                </div>
                <figcaption>{isCovers ? editionName : concept.caption}<span>{isCovers ? text.designDimensions : text.designConcept}</span></figcaption>
              </figure>
            ) : isMetal ? (
              <figure className={`${styles.visual} ${styles.metalVisual}`}>
                <div className={styles.metalObject} aria-hidden="true"><div className={styles.metalFace}><span>K</span><i /></div></div>
                <span className={styles.conceptBadge}>{text.future}</span>
                <figcaption>{concept.caption}<span>{text.specsTbc}</span></figcaption>
              </figure>
            ) : (
              <figure className={`${styles.visual} ${styles.keysVisual}`}>
                <Image src="/images/kagura-keycaps-cover.webp" alt={copy.experience.keyAlt} fill sizes="(max-width: 760px) 100vw, 60vw" className={styles.keycapsImage} />
                <span className={styles.conceptBadge}>{text.conceptDeveloping}</span>
                <figcaption>{concept.caption}<span>{text.layoutTbc}</span></figcaption>
              </figure>
            )}

            <div className={styles.tabList} role="tablist" aria-label={`${title} ${text.information}`}>
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
              <p className={styles.panelLead}>{isMetal ? text.metalLead : text.lead}</p>
              <dl className={styles.specs}>{specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
              <p className={styles.specNote}>{text.specNote}</p>
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
              <p className={styles.storySignoff}>{text.signoff}</p>
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
              <details><summary>{text.confirmedQuestion}</summary><p>{isGlass ? text.glassAnswer : text.otherAnswer}</p></details>
              <details><summary>{text.releaseQuestion}</summary><p>{isMetal ? text.releaseMetal : text.releaseDeveloping}{text.releaseBefore}<Link href="/#newsletter" onClick={onClose}>{text.newsletter}</Link>{text.releaseAfter}</p></details>
            </section>
          </div>

          <aside className={styles.aside} aria-label={text.overview}>
            <span className={styles.eyebrow}>KIKORA / {title}</span>
            <h3>{concept.asideTitle}</h3>
            <p className={styles.asideDescription}>{concept.description}</p>
            {isCovers ? <div className={styles.summaryRow}><span>{text.dimensions}</span><strong>490 × 420 mm</strong></div> : null}
            <div className={styles.status}><span aria-hidden="true" />{isMetal ? text.future : copy.experience.developing}</div>
            <p className={styles.releaseNote}>{text.releaseNote}</p>
            <Link href="/#newsletter" onClick={onClose} className={styles.primaryLink}>{copy.experience.release}<span aria-hidden="true">↗</span></Link>
            <div className={styles.asideFooter}><span>KIKORA</span><span>{text.footer1}<br />{text.footer2}</span></div>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
