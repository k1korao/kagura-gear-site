"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import styles from "./GlassExplorer.module.css";
import { coverEditions } from "@/lib/product-copy";
import { assetUrl } from "../../runtime/assets";

type GlassExplorerProps = {
  active: number;
  topView: boolean;
  onSelect: (index: number) => void;
};

type SceneControls = {
  update: () => void;
  hit: (clientX: number, clientY: number) => number | undefined;
};
type DragState = {
  id: number;
  x: number;
  y: number;
  start: number;
  position: number;
  step: number;
  fallbackIndex: number | undefined;
  intent: "pending" | "horizontal" | "vertical";
};

const WIDTH = 4.9;
const DEPTH = 4.2;
const SPACING = 5.85;
const clampPosition = (position: number) => Math.max(0, Math.min(coverEditions.length - 1, position));
const clampIndex = (index: number) => Math.round(clampPosition(index));

function outline(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function printCanvas(edition: number, image?: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const w = canvas.width;
  const h = canvas.height;
  const cover = coverEditions[edition] ?? coverEditions[0];
  ctx.fillStyle = cover.color;
  ctx.fillRect(0, 0, w, h);
  if (image) {
    const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
    const iw = image.naturalWidth * scale;
    const ih = image.naturalHeight * scale;
    ctx.drawImage(image, (w - iw) / 2, (h - ih) / 2, iw, ih);
  }
  const shade = ctx.createLinearGradient(0, 0, 0, h * 0.28);
  shade.addColorStop(0, "rgba(8,12,18,.24)");
  shade.addColorStop(1, "rgba(8,12,18,0)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, w, h * 0.28);
  ctx.fillStyle = [0, 2, 3].includes(edition) ? "#fbe04c" : "#f3f5ff";
  let typeSize = cover.id === "wraith" ? 182 : 155;
  ctx.font = `900 ${typeSize}px Arial, sans-serif`;
  while (ctx.measureText(cover.title).width > w * 0.89 && typeSize > 80) {
    typeSize -= 2;
    ctx.font = `900 ${typeSize}px Arial, sans-serif`;
  }
  ctx.textBaseline = "top";
  ctx.fillText(cover.title, w * 0.05, h * 0.045);
  ctx.font = "700 16px monospace";
  ctx.fillStyle = "#f3f5ff";
  ctx.fillText(`KIKORA / COVER STUDY — ${String(edition + 1).padStart(3, "0")}`, w * 0.05, h * 0.94);
  ctx.textBaseline = "alphabetic";
  return canvas;
}

/** A visual product stage. Navigation and product descriptions live in the parent. */
export function GlassExplorer({ active, topView, onSelect }: GlassExplorerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<SceneControls | null>(null);
  const propsRef = useRef({ active, topView, onSelect });
  propsRef.current = { active, topView, onSelect };
  const dragRef = useRef<DragState | null>(null);
  const fallbackRailRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return;
    }

    let disposed = false;
    let failed = false;
    let visible = true;
    let raf = 0;
    let lastTime = 0;
    let dirty = true;
    const pendingImages: HTMLImageElement[] = [];
    let rendered = false;
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let bounds = { width: 1, height: 1 };
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(22, 1, 0.05, 150);
    const rail = new THREE.Group();
    scene.add(rail);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    const canvas = renderer.domElement;
    canvas.className = styles.canvas;
    canvas.setAttribute("aria-hidden", "true");
    canvas.tabIndex = -1;
    host.appendChild(canvas);

    const geometry = <T extends THREE.BufferGeometry>(value: T): T => { geometries.add(value); return value; };
    const material = <T extends THREE.Material>(value: T): T => { materials.add(value); return value; };
    const texture = (value: THREE.Texture) => {
      value.colorSpace = THREE.SRGBColorSpace;
      value.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      textures.add(value);
      return value;
    };

    let environment: THREE.WebGLRenderTarget | null = null;
    try {
      const room = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      environment = pmrem.fromScene(room, 0.045);
      scene.environment = environment.texture;
      scene.environmentIntensity = 0.48;
      room.dispose();
      pmrem.dispose();
    } catch {
      // Direct lighting still gives the stage a complete appearance without an environment map.
    }

    scene.add(new THREE.HemisphereLight(0xffffff, 0x9ba2a6, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(-3, 10, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -9;
    key.shadow.camera.right = 9;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -10;
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 40;
    key.shadow.bias = -0.0005;
    key.shadow.normalBias = 0.02;
    key.shadow.radius = 4;
    scene.add(key);
    scene.add(key.target);
    const fill = new THREE.DirectionalLight(0xc9d8e4, 0.9);
    fill.position.set(6, 4, -7);
    scene.add(fill);

    const floor = new THREE.Mesh(
      geometry(new THREE.PlaneGeometry(70, 55)),
      material(new THREE.ShadowMaterial({ color: 0x38414b, opacity: 0.13 })),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(6, -0.001, -2);
    floor.receiveShadow = true;
    scene.add(floor);

    const padShape = outline(WIDTH, DEPTH, 0.115);
    const glassGeometry = geometry(new THREE.ExtrudeGeometry(padShape, {
      depth: 0.018, bevelEnabled: true, bevelSegments: 3,
      steps: 1, bevelSize: 0.009, bevelThickness: 0.002, curveSegments: 10,
    }));
    glassGeometry.rotateX(-Math.PI / 2);
    const baseGeometry = geometry(new THREE.ExtrudeGeometry(outline(WIDTH - 0.018, DEPTH - 0.018, 0.11), {
      depth: 0.008, bevelEnabled: false, curveSegments: 10,
    }));
    baseGeometry.rotateX(-Math.PI / 2);
    const surfaceGeometry = geometry(new THREE.ShapeGeometry(padShape, 20));
    const position = surfaceGeometry.attributes.position;
    const uv = surfaceGeometry.attributes.uv;
    for (let i = 0; i < position.count; i += 1) {
      uv.setXY(i, position.getX(i) / WIDTH + 0.5, position.getY(i) / DEPTH + 0.5);
    }
    uv.needsUpdate = true;
    surfaceGeometry.rotateX(-Math.PI / 2);
    const edgeGeometry = geometry(new THREE.EdgesGeometry(glassGeometry, 42));
    const baseMaterial = material(new THREE.MeshStandardMaterial({ color: 0x20262a, roughness: 0.92 }));
    const glassMaterial = material(new THREE.MeshPhysicalMaterial({
      color: 0xd1e2e4, roughness: 0.19, metalness: 0.04,
      clearcoat: 1, clearcoatRoughness: 0.1, transmission: 0.25,
      thickness: 0.022, ior: 1.5, envMapIntensity: 0.8,
    }));
    const edgeMaterial = material(new THREE.LineBasicMaterial({ color: 0xe5edef, transparent: true, opacity: 0.42 }));
    // Every edition owns a fixed print and physical pad in this continuous rail.
    const prints = coverEditions.map((_, index) => texture(new THREE.CanvasTexture(printCanvas(index))));
    const surfaceMaterials = prints.map((map) => material(new THREE.MeshPhysicalMaterial({
      map, roughness: 0.61, metalness: 0, clearcoat: 0.22,
      clearcoatRoughness: 0.56, envMapIntensity: 0.45,
    })));
    const selectable: THREE.Object3D[] = [];
    for (let i = 0; i < coverEditions.length; i += 1) {
      const pad = new THREE.Group();
      pad.position.x = i * SPACING;
      pad.userData.index = i;
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.castShadow = true;
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      glass.position.y = 0.01;
      glass.castShadow = true;
      const print = new THREE.Mesh(surfaceGeometry, surfaceMaterials[i]);
      print.position.y = 0.031;
      const edge = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      edge.position.y = 0.01;
      pad.add(base, glass, print, edge);
      selectable.push(print, glass);
      rail.add(pad);
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const lookCurrent = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();
    const cameraCurrent = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();
    let yaw = propsRef.current.topView ? 0 : Math.PI / 7.2;
    let viewMix = propsRef.current.topView ? 1 : 0;
    let positioned = false;
    function loadPrints() {
      coverEditions.forEach((edition, index) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.decoding = "async";
        pendingImages.push(image);
        image.onload = () => {
          if (disposed) return;
          const nextMap = texture(new THREE.CanvasTexture(printCanvas(index, image)));
          const previous = surfaceMaterials[index].map;
          surfaceMaterials[index].map = nextMap;
          surfaceMaterials[index].needsUpdate = true;
          if (previous) { previous.dispose(); textures.delete(previous); }
          dirty = true;
          start();
        };
        image.onerror = () => {
          // Its original colored print remains usable if an artwork cannot load.
          if (!disposed) { dirty = true; start(); }
        };
        image.src = assetUrl(`/images/album-concept-${edition.id}.webp`);
      });
    }

    function updateTargets() {
      const activeIndex = dragRef.current?.intent === "horizontal"
        ? dragRef.current.position : clampIndex(propsRef.current.active);
      const mobile = bounds.width <= 749;
      const x = Math.cos(yaw) * activeIndex * SPACING;
      const z = -Math.sin(yaw) * activeIndex * SPACING;
      const aspect = bounds.width / bounds.height;
      const viewWidth = WIDTH / (mobile ? 0.68 : 0.42);
      const distance = Math.max(9, viewWidth / aspect / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))));
      const angle = THREE.MathUtils.lerp(0.55, 1.565, viewMix);
      const offset = mobile ? 0 : 0.18;
      const frameHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;
      const lift = mobile ? 0 : frameHeight * 0.105;
      lookTarget.set(x + offset, -Math.cos(angle) * lift, z + Math.sin(angle) * lift);
      cameraTarget.set(lookTarget.x, lookTarget.y + Math.sin(angle) * distance, lookTarget.z + Math.cos(angle) * distance);
      rail.rotation.y = yaw;
      if (!positioned || reducedMotion) {
        cameraCurrent.copy(cameraTarget);
        lookCurrent.copy(lookTarget);
        positioned = true;
      }
    }

    function tick(time: number) {
      raf = 0;
      if (disposed || failed || !visible || document.hidden) return;
      const delta = Math.min(lastTime ? (time - lastTime) / 1000 : 1 / 60, 0.05);
      lastTime = time;
      const alpha = reducedMotion ? 1 : 1 - Math.exp(-4.5 * delta);
      const targetMix = propsRef.current.topView ? 1 : 0;
      const targetYaw = propsRef.current.topView ? 0 : Math.PI / 7.2;
      yaw += (targetYaw - yaw) * alpha;
      viewMix += (targetMix - viewMix) * alpha;
      updateTargets();
      cameraCurrent.lerp(cameraTarget, alpha);
      lookCurrent.lerp(lookTarget, alpha);
      camera.position.copy(cameraCurrent);
      camera.lookAt(lookCurrent);
      key.position.set(lookCurrent.x - 3, 10, lookCurrent.z + 7);
      key.target.position.set(lookCurrent.x, 0, lookCurrent.z);
      const moving = cameraCurrent.distanceToSquared(cameraTarget) > 0.000001
        || Math.abs(viewMix - targetMix) > 0.0001 || Math.abs(yaw - targetYaw) > 0.0001;
      if (dirty || moving || !rendered) {
        try { renderer.render(scene, camera); }
        catch { failed = true; setReady(false); return; }
        dirty = false;
        if (!rendered) { rendered = true; setReady(true); }
      }
      if (moving) raf = requestAnimationFrame(tick);
    }

    function start() {
      if (!raf && !disposed && !failed && visible && !document.hidden) {
        lastTime = 0;
        raf = requestAnimationFrame(tick);
      }
    }

    function resize() {
      const rect = host!.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      bounds = { width: rect.width, height: rect.height };
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height, false);
      dirty = true;
      start();
    }

    function hit(clientX: number, clientY: number) {
      const rect = canvas.getBoundingClientRect();
      pointer.set((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const object = raycaster.intersectObjects(selectable, false)[0]?.object;
      return object?.parent?.userData.index as number | undefined;
    }

    function onMotionChange(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
      dirty = true;
      start();
    }
    function onVisibilityChange() {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else { dirty = true; start(); }
    }
    function onContextLost(event: Event) {
      event.preventDefault();
      failed = true;
      cancelAnimationFrame(raf);
      raf = 0;
      setReady(false);
    }

    canvas.addEventListener("webglcontextlost", onContextLost);
    motionQuery.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) { dirty = true; start(); }
      else { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0 });
    intersectionObserver.observe(host);
    controlsRef.current = { update: () => { dirty = true; start(); }, hit };
    loadPrints();
    resize();

    return () => {
      disposed = true;
      controlsRef.current = null;
      cancelAnimationFrame(raf);
      pendingImages.forEach((image) => { image.onload = null; image.onerror = null; image.src = ""; });
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scene.environment = null;
      geometries.forEach((item) => item.dispose());
      materials.forEach((item) => item.dispose());
      textures.forEach((item) => item.dispose());
      environment?.dispose();
      key.shadow.map?.dispose();
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      scene.clear();
    };
  }, []);

  useEffect(() => { controlsRef.current?.update(); }, [active, topView]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !event.isPrimary || dragRef.current) return;
    const width = event.currentTarget.clientWidth;
    const mobile = width <= 749;
    // Match the physical rail spacing closely enough that a pad follows the hand.
    const step = Math.max(160, width * (mobile ? 0.68 : 0.42) * SPACING / WIDTH * (topView ? 1 : Math.cos(Math.PI / 7.2)));
    const tile = (event.target as Element).closest<HTMLElement>("[data-edition]");
    dragRef.current = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      start: clampIndex(active), position: clampIndex(active), step, intent: "pending",
      fallbackIndex: tile ? Number(tile.dataset.edition) : undefined,
    };
    if (event.pointerType !== "touch") event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (drag.intent === "pending") {
      if (Math.hypot(dx, dy) < 8) return;
      drag.intent = Math.abs(dx) > Math.abs(dy) * 1.2 ? "horizontal" : "vertical";
      if (drag.intent === "horizontal") event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (drag.intent !== "horizontal") return;
    drag.position = clampPosition(drag.start - dx / drag.step);
    event.currentTarget.dataset.dragging = "true";
    fallbackRailRef.current?.style.setProperty("--position", String(drag.position));
    controlsRef.current?.update();
  }

  function finishPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    let next = clampIndex(propsRef.current.active);
    if (event.type !== "pointercancel" && event.type !== "lostpointercapture") {
      if (drag.intent === "horizontal") {
        const dx = event.clientX - drag.x;
        const steps = Math.abs(dx) > Math.max(42, drag.step * 0.16)
          ? Math.max(1, Math.round(Math.abs(dx) / drag.step)) * (dx < 0 ? 1 : -1) : 0;
        next = clampIndex(drag.start + steps);
      } else if (drag.intent === "pending") {
        const hit = ready ? controlsRef.current?.hit(event.clientX, event.clientY) : drag.fallbackIndex;
        if (hit !== undefined && Number.isFinite(hit)) next = clampIndex(hit);
      }
    }
    fallbackRailRef.current?.style.setProperty("--position", String(next));
    if (next !== propsRef.current.active) propsRef.current.onSelect(next);
    controlsRef.current?.update();
  }

  return (
    <div
      ref={hostRef}
      className={`${styles.stage} ${ready ? styles.ready : ""}`}
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={finishPointer}
      onLostPointerCapture={finishPointer}
    >
      <div className={`${styles.fallback} ${topView ? styles.fallbackTop : ""}`}>
        <div className={styles.fallbackView}>
          <div ref={fallbackRailRef} className={styles.fallbackRail} style={{ "--position": clampIndex(active) } as CSSProperties}>
            {coverEditions.map((edition, index) => (
              <div
                key={edition.id}
                className={styles.fallbackPad}
                data-edition={index}
                style={{ backgroundColor: edition.color, backgroundImage: `url(${assetUrl(`/images/album-concept-${edition.id}.webp`)})` }}
              >
                <strong className={[0, 2, 3].includes(index) ? styles.warmTitle : ""}>{edition.title}</strong>
                <span>KIKORA <small>COVER STUDY — {String(index + 1).padStart(3, "0")}</small></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
