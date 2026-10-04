"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./CollectionSound.module.css";
import music from "../../public/audio/music.json";

export function CollectionSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const desiredPlayback = useRef(false);
  const requestId = useRef(0);
  const volumeRef = useRef(music.defaultVolume);
  const [enabled, setEnabled] = useState(false);
  const [pending, setPending] = useState(false);
  const [volume, setVolume] = useState(music.defaultVolume);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState({ left: 12, top: 80, width: 248 });
  const id = useId();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volumeRef.current;
    return () => {
      desiredPlayback.current = false;
      requestId.current += 1;
      audio?.pause();
    };
  }, []);

  useLayoutEffect(() => {
    if (!popoverOpen) return;

    function placePanel() {
      const bounds = controlRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const width = Math.min(248, window.innerWidth - 24);
      const height = panelRef.current?.offsetHeight ?? 170;
      setPosition({
        width,
        left: Math.max(12, Math.min(bounds.right - width, window.innerWidth - width - 12)),
        top: Math.max(12, Math.min(bounds.bottom + 12, window.innerHeight - height - 12)),
      });
    }

    function dismissOutside(event: PointerEvent) {
      const target = event.target;
      if (target instanceof Node && !controlRef.current?.contains(target) && !panelRef.current?.contains(target)) {
        setPopoverOpen(false);
      }
    }

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setPopoverOpen(false);
      settingsRef.current?.focus({ preventScroll: true });
    }

    placePanel();
    sliderRef.current?.focus({ preventScroll: true });
    window.addEventListener("resize", placePanel);
    window.addEventListener("scroll", placePanel, true);
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      window.removeEventListener("resize", placePanel);
      window.removeEventListener("scroll", placePanel, true);
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [popoverOpen, error]);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!music.src) { setPopoverOpen(true); return; }
    const shouldPlay = !desiredPlayback.current;
    desiredPlayback.current = shouldPlay;
    const currentRequest = ++requestId.current;
    setEnabled(shouldPlay);
    setError("");

    if (!shouldPlay) {
      audio.pause();
      setPending(false);
      return;
    }

    setPending(true);
    audio.volume = volumeRef.current;
    void audio.play().then(() => {
      if (currentRequest !== requestId.current) {
        if (!desiredPlayback.current) audio.pause();
        return;
      }
      setPending(false);
    }).catch(() => {
      if (currentRequest !== requestId.current) return;
      desiredPlayback.current = false;
      audio.pause();
      setEnabled(false);
      setPending(false);
      setError("Audio couldn’t start. Try again.");
      setPopoverOpen(true);
    });
  }

  function changeVolume(value: string) {
    const next = Math.min(1, Math.max(0, Number(value) / 100));
    volumeRef.current = next;
    setVolume(next);
    if (audioRef.current) audioRef.current.volume = next;
  }

  return (
    <div className={styles.control} ref={controlRef}>
      <audio ref={audioRef} src={music.src || undefined} loop preload="none" />
      <button
        type="button"
        className={`${styles.toggle} ${enabled ? styles.enabled : ""}`}
        aria-pressed={enabled}
        aria-label={pending ? "Sound on, starting. Turn sound off" : enabled ? "Sound on. Turn sound off" : "Sound off. Turn sound on"}
        onClick={togglePlayback}
      >
        <svg className={enabled && !pending ? styles.wavePlaying : styles.wave} viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
          <path d="M3 8v4M7 4v12M11 6v8M15 3v14M19 8v4" />
        </svg>
        <span>SOUND {enabled ? "ON" : "OFF"}</span>
      </button>
      <button
        ref={settingsRef}
        type="button"
        className={styles.settings}
        aria-label="Music volume and track information"
        aria-haspopup="dialog"
        aria-expanded={popoverOpen}
        aria-controls={`${id}-panel`}
        onClick={() => setPopoverOpen((current) => !current)}
      >
        <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path d="M5 3v14M15 3v14M2 7h6M12 13h6" /></svg>
      </button>
      {popoverOpen ? createPortal(
        <div
          className={styles.popover}
          id={`${id}-panel`}
          ref={panelRef}
          role="dialog"
          aria-labelledby={`${id}-heading`}
          style={position}
        >
          <div className={styles.panelHeading}>
            <h2 id={`${id}-heading`}>LISTEN ALONG</h2>
            <button type="button" className={styles.close} aria-label="Close music settings" onClick={() => { setPopoverOpen(false); settingsRef.current?.focus({ preventScroll: true }); }}>×</button>
          </div>
          <p className={styles.track}>{music.title}</p>
          <div className={styles.volumeLabel}><label htmlFor={`${id}-volume`}>Volume</label><output htmlFor={`${id}-volume`}>{Math.round(volume * 100)}%</output></div>
          <input ref={sliderRef} id={`${id}-volume`} className={styles.slider} type="range" min="0" max="100" step="1" value={Math.round(volume * 100)} aria-valuetext={`${Math.round(volume * 100)} percent`} onChange={(event) => changeVolume(event.target.value)} />
          {error ? <div className={styles.error}><p role="status">{error}</p><button type="button" onClick={togglePlayback}>Retry audio <span aria-hidden="true">↗</span></button></div> : <p className={styles.note}>{pending ? "Starting audio…" : enabled ? "Playing. Close this panel to keep listening." : music.src ? "Sound is off. Play when you feel like it." : "Our background track is being selected. Sound is off."}</p>}
        </div>, document.body,
      ) : null}
    </div>
  );
}
