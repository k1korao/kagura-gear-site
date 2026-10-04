"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./ShrineDetails.module.css";
import { AlbumArtwork } from "./AlbumArtwork";

type Tab = "specs" | "story" | "faq";
type ShrineDetailsProps = {
  open: boolean;
  onClose: () => void;
  kind: "glass" | "keycaps";
  edition?: number;
};

const tabs: { id: Tab; label: string }[] = [
  { id: "specs", label: "Specs" },
  { id: "story", label: "Story" },
  { id: "faq", label: "FAQ" },
];

export function ShrineDetails({ open, onClose, kind, edition = 0 }: ShrineDetailsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  const backdropPointerDown = useRef(false);
  const [activeTab, setActiveTab] = useState<Tab>("specs");
  const id = useId();
  const isGlass = kind === "glass";
  const title = isGlass ? "Glass mousepad" : "Keycaps";

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
              <p className={styles.index}>{isGlass ? "01 / Glass" : "02 / Keys"}</p>
              <h2 id={`${id}-title`}>{title}</h2>
              <p>{isGlass ? "One artwork. One edition. A new way to set the tone." : "A new point of contact. Designed to become part of your everyday."}</p>
            </div>

            {isGlass ? (
              <figure className={styles.visual}>
                <div className={styles.glassPad} aria-hidden="true">
                  <AlbumArtwork edition={edition} />
                </div>
                <figcaption>Artwork study<span>490 × 420 mm design</span></figcaption>
              </figure>
            ) : (
              <figure className={`${styles.visual} ${styles.keysVisual}`}>
                <div className={styles.keyStudy} aria-hidden="true">
                  {Array.from({ length: 15 }, (_, index) => <span key={index}>{index === 2 ? "K" : index === 7 ? "↗" : index === 12 ? "A" : ""}</span>)}
                </div>
                <span className={styles.conceptBadge}>Concept / In development</span>
                <figcaption>Form study<span>Layout and profile to be confirmed</span></figcaption>
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
              {isGlass ? (
                <>
                  <p className={styles.panelLead}>The edition starts here.</p>
                  <dl className={styles.specs}>
                    {[
                      ["Design dimensions", "490 × 420 mm"],
                      ["Category", "Glass mousepad"],
                      ["Artwork", "One artwork per edition"],
                      ["Thickness", "To be confirmed"],
                      ["Surface & base", "To be confirmed"],
                      ["Status", "In development"],
                    ].map(([label, value]) => (
                      <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                    ))}
                  </dl>
                  <p className={styles.specNote}>Final specifications, pricing, and release timing will be shared as development progresses.</p>
                </>
              ) : (
                <>
                  <p className={styles.panelLead}>The details are still in development.</p>
                  <p>Materials, keycap profile, layout compatibility, kit contents, pricing, and release timing have not been announced. We will share confirmed details as development progresses.</p>
                  <div className={styles.developmentNote}><span aria-hidden="true" />In development</div>
                </>
              )}
            </section>

            <section
              role="tabpanel"
              id={`${id}-panel-story`}
              aria-labelledby={`${id}-tab-story`}
              hidden={activeTab !== "story"}
              tabIndex={0}
              className={styles.panel}
            >
              <p className={styles.panelLead}>{isGlass ? "A surface with its own sound." : "Small details. A different feel."}</p>
              <p>{isGlass ? "Each glass mousepad is conceived as its own edition: one artwork, one visual identity. Music and album design guide the atmosphere, while the final artwork is still in development." : "KAGURA Keycaps explores how color, form, and small details can give a desk its own character. This is a design concept; the final product and its specifications are still in development."}</p>
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
              {isGlass ? (
                <>
                  <details open><summary>What does an edition mean?</summary><p>One artwork defines each glass mousepad edition. The direction draws on music and album visuals; the artwork shown here is a design study.</p></details>
                  <details><summary>What are the specifications?</summary><p>The design dimensions are 490 × 420 mm. Glass thickness, surface finish, and base construction are still being developed.</p></details>
                  <details><summary>Can I order one now?</summary><p>This is a development preview. Pricing, availability, and release timing have not been announced. Follow the <Link href="/shrine#newsletter" onClick={onClose}>release updates</Link> for confirmed details.</p></details>
                </>
              ) : (
                <>
                  <details open><summary>Can I order the keycaps?</summary><p>KAGURA Keycaps is currently a concept in development. Orders and preorders are not available from this preview.</p></details>
                  <details><summary>Which keyboards will they fit?</summary><p>Layout compatibility, keycap profile, and kit contents have not been announced.</p></details>
                  <details><summary>How can I hear about the launch?</summary><p>Visit the <Link href="/shrine#newsletter" onClick={onClose}>release newsletter</Link> to choose whether to sign up for updates.</p></details>
                </>
              )}
            </section>
          </div>

          <aside className={styles.aside} aria-label="Product overview">
            <span className={styles.eyebrow}>KAGURA / {isGlass ? "Glass editions" : "Keycaps"}</span>
            <h3>{isGlass ? "Set your own tone." : "Make every key your own."}</h3>
            <p className={styles.asideDescription}>{isGlass ? "Music-led visual editions for your desk. One design at a time." : "An exploration of color and form, made for your everyday setup."}</p>
            {isGlass ? <div className={styles.summaryRow}><span>Design dimensions</span><strong>490 × 420 mm</strong></div> : null}
            <div className={styles.status}><span aria-hidden="true" />In development</div>
            <p className={styles.releaseNote}>Specs to be confirmed. Release details to come.</p>
            <Link href="/shrine#newsletter" onClick={onClose} className={styles.primaryLink}>Get release updates<span aria-hidden="true">↗</span></Link>
            <div className={styles.asideFooter}><span>KAGURA</span><span>Your desk.<br />Your own frequency.</span></div>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
