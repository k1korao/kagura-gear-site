"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AlbumArtwork } from "./AlbumArtwork";
import { ShrineDetails } from "./ShrineDetails";
import styles from "./ShrineExperience.module.css";

const editions = [
  { name: "Starplayer.", tag: "001 / THE COVER SERIES", color: "#da3c36", description: "Reyna in the spotlight. Rap-cover attitude, electric violet, and a red that refuses to fade. A character remix concept." },
  { name: "Void FM.", tag: "002 / THE COVER SERIES", color: "#234cc4", description: "Wraith on another frequency. Cold light, fractured space, and the energy of a late-night record. A character remix concept." },
  { name: "The Chemist.", tag: "003 / THE COVER SERIES", color: "#8c8a3e", description: "Caustic, center stage. Olive shadows, old-gold light, and a warehouse with a story to tell. A cinematic character remix concept." },
];

export function ShrineExperience() {
  const [kind, setKind] = useState<"glass" | "keycaps">("glass");
  const [active, setActive] = useState(2);
  const [flat, setFlat] = useState(false);
  const [open, setOpen] = useState(false);
  const stage = useRef<HTMLElement>(null);
  const object = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const keycaps = kind === "keycaps";
  const edition = editions[active];

  useEffect(() => {
    function showGlass() { setKind("glass"); setFlat(false); }
    window.addEventListener("kagura:show-glass", showGlass);
    return () => window.removeEventListener("kagura:show-glass", showGlass);
  }, []);

  function resetTilt() { object.current?.style.setProperty("--look-x", "0deg"); object.current?.style.setProperty("--look-y", "0deg"); }
  function choose(index: number) { setActive((index + editions.length) % editions.length); resetTilt(); }
  function selectKind(next: "glass" | "keycaps") { setKind(next); setFlat(false); resetTilt(); }
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || flat || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    object.current?.style.setProperty("--look-x", `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 7}deg`);
    object.current?.style.setProperty("--look-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 9}deg`);
  }
  function release(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current; pointerStart.current = null;
    if (!start || keycaps) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) choose(active + (dx < 0 ? 1 : -1));
  }
  function showEdition(index: number) { selectKind("glass"); choose(index); stage.current?.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block:"start"}); }
  function showKeycaps() { selectKind("keycaps"); stage.current?.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",block:"start"}); }

  return <div className={styles.root}>
    <section id="collections" ref={stage} className={styles.stage} aria-label="Explore Kagura glass mousepads and keycaps">
      <div className={styles.stageTop}><p><span className={styles.liveDot}/>OBJECTS ON REPEAT. <span className={styles.volume}>/ COLLECTION STUDIES</span></p><div className={styles.collectionTabs} role="group" aria-label="Choose a collection"><button type="button" aria-pressed={!keycaps} onClick={()=>selectKind("glass")}>GLASS MOUSEPADS <span>03</span></button><button type="button" aria-pressed={keycaps} onClick={()=>selectKind("keycaps")}>KEYCAPS <span>01</span></button></div></div>
      <div className={styles.gallery}>
        <span className={styles.worldWord} aria-hidden="true">{keycaps ? "TYPE." : "PLAY."}</span>
        <div className={styles.artStage} tabIndex={0} role="group" aria-label={keycaps ? "Keycap concept viewer" : "Glass mousepad viewer. Use left and right arrow keys to change artwork."} onKeyDown={event=>{if(!keycaps&&(event.key==="ArrowRight"||event.key==="ArrowLeft")){event.preventDefault();choose(active+(event.key==="ArrowRight"?1:-1));}}} onPointerMove={move} onPointerLeave={resetTilt} onPointerDown={event=>{if(!event.isPrimary||event.button!==0)return;pointerStart.current={x:event.clientX,y:event.clientY};event.currentTarget.setPointerCapture(event.pointerId);}} onPointerUp={release} onPointerCancel={()=>{pointerStart.current=null;resetTilt();}}>
          <div className={styles.floorShadow} aria-hidden="true"/>
          <div ref={object} className={`${styles.object} ${keycaps ? styles.keycapObject : styles.matObject} ${flat ? styles.flat : ""}`}>
            {keycaps ? <div className={styles.conceptImage} key="keycaps"><Image src="/images/kagura-studio-concept.webp" alt="Ivory, rose and burgundy keycap color study; collection in development" fill sizes="(max-width: 760px) 90vw, 58vw" draggable={false} className={styles.image}/></div> : <div className={styles.mat} key={active} role="img" aria-label={`${edition.name} glass mousepad design visualization`}><AlbumArtwork edition={active} priority/></div>}
          </div>
          <span className={styles.visualNote}>{keycaps ? "KEYCAP COLOR STUDY" : "490 × 420 MM / DESIGN VISUALIZATION"}</span>
        </div>
        <div className={styles.productInfo} key={`${kind}-${active}`}>
          <div className={styles.productKicker}>{keycaps ? "001 / KEYCAP COLLECTION" : edition.tag}<span className={styles.status}>DESIGN CONCEPT</span></div>
          <h1>{keycaps ? <>A little<br/><em>more you.</em></> : edition.name}</h1>
          <p className={styles.subtitle}>{keycaps ? "KEYCAPS / IN DEVELOPMENT" : "ALBUM-INSPIRED GLASS MOUSEPAD"}</p>
          <p className={styles.description}>{keycaps ? "Ivory, rose, and a little after-dark burgundy. A new palette for your everyday keys." : edition.description}</p>
          <dl className={styles.specs}>{(keycaps?[["PALETTE","Ivory / Rose"],["STATUS","In development"]]:[["FORMAT","490 × 420","MM"],["MATERIAL","Glass"],["STATUS","In development"]]).map(([label,value,unit])=><div key={label}><dt>{label}</dt><dd>{value}{unit?<small>{unit}</small>:null}</dd></div>)}</dl>
          {!keycaps?<div className={styles.editionPicker} role="group" aria-label="Choose artwork">{editions.map((item,index)=><button type="button" key={item.name} aria-label={item.name} aria-pressed={active===index} onClick={()=>choose(index)}><span style={{background:item.color}}/>0{index+1}</button>)}<span>ARTWORK STUDIES</span></div>:null}
          <button className={styles.primaryButton} type="button" aria-haspopup="dialog" onClick={()=>setOpen(true)}>EXPLORE THE DETAILS <span aria-hidden="true">↗</span></button>
          <Link className={styles.textLink} href="#newsletter">Get release updates <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className={styles.stageBottom}><div className={styles.viewControl}>{!keycaps?<div role="group" aria-label="Product viewing angle"><button type="button" onClick={()=>{setFlat(false);resetTilt();}} aria-pressed={!flat}>PERSPECTIVE</button><button type="button" onClick={()=>{setFlat(true);resetTilt();}} aria-pressed={flat}>TOP VIEW</button></div>:<span>THE KEYCAP COLLECTION</span>}<small>{keycaps?"Final specifications to come":"Concept collection · Final artwork to come"}</small></div>{!keycaps?<div className={styles.pagination}><button type="button" aria-label="Previous artwork" onClick={()=>choose(active-1)}>←</button><span aria-live="polite" aria-atomic="true">0{active+1}<i/>03<span className={styles.srOnly}>, {edition.name}</span></span><button type="button" aria-label="Next artwork" onClick={()=>choose(active+1)}>→</button></div>:<span className={styles.chapterStatus}>CURRENTLY IN DEVELOPMENT</span>}<a href="#craft" className={styles.scrollLink}>THE IDEA <span aria-hidden="true">↓</span></a></div>
    </section>
    <section id="craft" className={styles.collection} aria-labelledby="collection-title"><div className={styles.sectionHeading}><p className={styles.eyebrow}>MUSIC, MADE PHYSICAL.</p><h2 id="collection-title">One record.<br/><em>One design.</em></h2><p>Your favorite game worlds, remixed with the visual language of rap records. One cover, one character, one place on your desk.</p></div><div className={styles.records}>{editions.map((item,index)=><button className={styles.record} type="button" key={item.name} onClick={()=>showEdition(index)} aria-label={`Explore ${item.name} glass mousepad concept`}><div className={styles.recordArt}><AlbumArtwork edition={index}/><span className={styles.recordArrow} aria-hidden="true">↗</span></div><div className={styles.recordLabel}><span>0{index+1} / ARTWORK STUDY</span><h3>{item.name}</h3><p>Glass mousepad concept <span>490 × 420 mm</span></p></div></button>)}</div><p className={styles.conceptNote}>Character remix and cinematic artwork concepts. Independently created, with no official game or artist collaboration implied. Final editions are in development.</p></section>
    <section id="keycaps" className={styles.nextChapter}><div className={styles.chapterImage}><Image src="/images/kagura-studio-concept.webp" alt="Keycap concept in an ivory, rose and burgundy palette" fill sizes="(max-width: 760px) 100vw, 50vw" className={styles.image}/></div><div className={styles.chapterCopy}><p className={styles.eyebrow}>ON YOUR DESK / AT YOUR FINGERTIPS</p><h2>Make it<br/><em>your own.</em></h2><p>Thoughtful color. A little character. Our keycap collection is taking shape alongside our glass mousepads.</p><span className={styles.developmentLabel}>KEYCAPS / IN DEVELOPMENT</span><button type="button" onClick={showKeycaps} className={styles.chapterLink}>EXPLORE THE CONCEPT <span aria-hidden="true">↗</span></button></div></section>
    <ShrineDetails open={open} onClose={()=>setOpen(false)} kind={kind} edition={active}/>
  </div>;
}
