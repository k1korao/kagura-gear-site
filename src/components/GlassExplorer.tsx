"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import styles from "./GlassExplorer.module.css";
import { coverEditions } from "@/lib/product-copy";

type GlassExplorerProps = {
  active: number;
  edition: number;
  topView: boolean;
  onSelect: (index: number) => void;
};

type SceneControls = { update: () => void };

const WIDTH = 4.9;
const DEPTH = 4.2;
const SPACING = 5.85;
const EDITIONS = coverEditions.map(item => item.id);
const clampIndex = (index: number, count = 3) => Math.max(0, Math.min(count - 1, Math.round(index)));

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

function printCanvas(kind: "core" | "artist" | "cover", image?: HTMLImageElement, edition = 0) {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const w = canvas.width;
  const h = canvas.height;
  if (kind === "core") {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#33383b");
    gradient.addColorStop(0.48, "#24292c");
    gradient.addColorStop(1, "#181d21");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    // A fixed noise seed keeps the printed surface stable between renders.
    let seed = 971;
    for (let i = 0; i < 39000; i += 1) {
      seed = (seed * 16807) % 2147483647;
      const x = (seed % 14000) / 10;
      seed = (seed * 16807) % 2147483647;
      const y = (seed % 12000) / 10;
      ctx.fillStyle = i % 2 ? "rgba(255,255,255,.055)" : "rgba(0,0,0,.1)";
      ctx.fillRect(x, y, 1.3, 1.3);
    }
    ctx.fillStyle = "#e8edf0";
    ctx.font = "500 21px Arial, sans-serif";
    ctx.fillText("KIKORA", 54, h - 63);
    ctx.font = "14px monospace";
    ctx.fillStyle = "#a5adb3";
    ctx.fillText("GG—01 / 490 × 420", w - 278, h - 63);
  } else if (kind === "artist") {
    const gradient = ctx.createLinearGradient(w, 0, 0, h);
    gradient.addColorStop(0, "#d8e1e6");
    gradient.addColorStop(0.45, "#8c9ead");
    gradient.addColorStop(1, "#273e55");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w * 0.51, h * 0.44);
    ctx.rotate(-0.48);
    for (let i = 0; i < 15; i += 1) {
      const size = 800 - i * 44;
      ctx.lineWidth = i % 3 === 0 ? 15 : 2;
      ctx.strokeStyle = i % 3 === 0 ? "rgba(219,232,240,.58)" : "rgba(39,58,77,.42)";
      ctx.strokeRect(-size / 2 + i * 6, -size / 2, size, size);
    }
    ctx.restore();
    const glow = ctx.createRadialGradient(w * 0.7, h * 0.28, 0, w * 0.7, h * 0.28, w * 0.5);
    glow.addColorStop(0, "rgba(224,237,242,.47)");
    glow.addColorStop(1, "rgba(224,237,242,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#f3f6f7";
    ctx.font = "500 21px Arial, sans-serif";
    ctx.fillText("KIKORA / STUDIO", 54, h - 63);
    ctx.font = "14px monospace";
    ctx.fillText("FORM STUDY — 001", w - 255, h - 63);
  } else {
    ctx.fillStyle = coverEditions[edition]?.color || "#aeb8c4";
    ctx.fillRect(0, 0, w, h);
    if (image) {
      const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
      const iw = image.naturalWidth * scale;
      const ih = image.naturalHeight * scale;
      ctx.drawImage(image, (w - iw) / 2, (h - ih) / 2, iw, ih);
      const cover = coverEditions[edition] ?? coverEditions[0];
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
    }
  }
  return canvas;
}

/** A visual product stage. Navigation and product descriptions live in the parent. */
export function GlassExplorer({ active, edition, topView, onSelect }: GlassExplorerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<SceneControls | null>(null);
  const propsRef = useRef({ active, edition, topView, onSelect });
  propsRef.current = { active, edition, topView, onSelect };
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
    let coverRequest = 0;
    let loadedEdition = -1;
    let coverImage: HTMLImageElement | null = null;
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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 18;
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
    const prints = [
      texture(new THREE.CanvasTexture(printCanvas("core"))),
      texture(new THREE.CanvasTexture(printCanvas("artist"))),
      texture(new THREE.CanvasTexture(printCanvas("cover"))),
    ];
    const surfaceMaterials = prints.map((map) => material(new THREE.MeshPhysicalMaterial({
      map, roughness: 0.61, metalness: 0, clearcoat: 0.22,
      clearcoatRoughness: 0.56, envMapIntensity: 0.45,
    })));
    surfaceMaterials[0].color.setHex(0xe0e0e0);
    surfaceMaterials[0].roughness = 0.84;
    surfaceMaterials[0].clearcoat = 0.08;
    surfaceMaterials[0].envMapIntensity = 0.2;
    const selectable: THREE.Object3D[] = [];
    for (let i = 0; i < 3; i += 1) {
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
    const peek = new THREE.Vector2();
    const peekTarget = new THREE.Vector2();
    const orbit = new THREE.Vector3();
    const orbitRight = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion();
    let yaw = propsRef.current.topView ? 0 : Math.PI / 7.2;
    let viewMix = propsRef.current.topView ? 1 : 0;
    let positioned = false;
    let drag: { id: number; x: number; y: number; touch: boolean; moved: boolean; captured: boolean } | null = null;

    function changeCover() {
      const next = clampIndex(propsRef.current.edition, EDITIONS.length);
      if (loadedEdition === next) return;
      loadedEdition = next;
      const request = ++coverRequest;
      if (coverImage) { coverImage.onload = null; coverImage.onerror = null; coverImage.src = ""; }
      const image = new Image();
      coverImage = image;
      image.onload = () => {
        if (disposed || request !== coverRequest) return;
        const nextMap = texture(new THREE.CanvasTexture(printCanvas("cover", image, next)));
        const previous = surfaceMaterials[2].map;
        surfaceMaterials[2].map = nextMap;
        surfaceMaterials[2].needsUpdate = true;
        if (previous) { previous.dispose(); textures.delete(previous); }
        dirty = true;
        start();
      };
      image.onerror = () => {
        if (disposed || request !== coverRequest) return;
        const nextMap = texture(new THREE.CanvasTexture(printCanvas("cover", undefined, next)));
        const previous = surfaceMaterials[2].map;
        surfaceMaterials[2].map = nextMap;
        surfaceMaterials[2].needsUpdate = true;
        if (previous) { previous.dispose(); textures.delete(previous); }
        dirty = true;
        start();
      };
      image.src = `/images/album-concept-${EDITIONS[next]}.webp`;
    }

    function updateTargets() {
      const activeIndex = clampIndex(propsRef.current.active);
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
      if (drag?.moved && !reducedMotion) peek.lerp(peekTarget, 1 - Math.exp(-7 * delta));
      else peek.multiplyScalar(reducedMotion ? 0 : Math.exp(-7 * delta));
      orbit.copy(cameraCurrent).sub(lookCurrent);
      quat.setFromAxisAngle(up, peek.y);
      orbit.applyQuaternion(quat);
      orbitRight.crossVectors(up, orbit).normalize();
      quat.setFromAxisAngle(orbitRight, peek.x);
      orbit.applyQuaternion(quat);
      camera.position.copy(lookCurrent).add(orbit);
      camera.lookAt(lookCurrent);
      const moving = cameraCurrent.distanceToSquared(cameraTarget) > 0.000001
        || Math.abs(viewMix - targetMix) > 0.0001 || Math.abs(yaw - targetYaw) > 0.0001
        || peek.lengthSq() > 0.0000001 || !!drag?.moved;
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

    function hit(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const object = raycaster.intersectObjects(selectable, false)[0]?.object;
      return object?.parent?.userData.index as number | undefined;
    }

    function onDown(event: PointerEvent) {
      if (event.button !== 0 || drag) return;
      const touch = event.pointerType === "touch";
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, touch, moved: false, captured: false };
      if (!touch) { canvas.setPointerCapture(event.pointerId); drag.captured = true; }
    }

    function onMove(event: PointerEvent) {
      if (!drag || drag.id !== event.pointerId) {
        if (event.pointerType !== "touch") canvas.style.cursor = hit(event) === undefined ? "default" : "grab";
        return;
      }
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (drag.touch && !drag.captured) {
        if (Math.abs(dx) <= 8 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
        canvas.setPointerCapture(event.pointerId);
        drag.captured = true;
      }
      if (Math.hypot(dx, dy) > 6) drag.moved = true;
      if (!drag.moved) return;
      canvas.style.cursor = "grabbing";
      peekTarget.set(0.12 * Math.tanh(-dy * 0.0016 / 0.12), 0.12 * Math.tanh(-dx * 0.0016 / 0.12));
      if (drag.touch && event.cancelable) event.preventDefault();
      dirty = true;
      start();
    }

    function finishPointer(event: PointerEvent) {
      if (!drag || drag.id !== event.pointerId) return;
      const finished = drag;
      drag = null;
      if (finished.captured && canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      canvas.style.cursor = "grab";
      if (event.type !== "pointercancel") {
        const dx = event.clientX - finished.x;
        const dy = event.clientY - finished.y;
        if (finished.touch && finished.moved && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
          const next = clampIndex(propsRef.current.active + (dx < 0 ? 1 : -1));
          if (next !== propsRef.current.active) propsRef.current.onSelect(next);
        } else if (!finished.moved) {
          const index = hit(event);
          if (index !== undefined && index !== propsRef.current.active) propsRef.current.onSelect(index);
        }
      }
      dirty = true;
      start();
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

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove, { passive: false });
    canvas.addEventListener("pointerup", finishPointer);
    canvas.addEventListener("pointercancel", finishPointer);
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
    controlsRef.current = { update: () => { changeCover(); dirty = true; start(); } };
    changeCover();
    resize();

    return () => {
      disposed = true;
      coverRequest += 1;
      controlsRef.current = null;
      cancelAnimationFrame(raf);
      if (coverImage) { coverImage.onload = null; coverImage.onerror = null; coverImage.src = ""; }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", finishPointer);
      canvas.removeEventListener("pointercancel", finishPointer);
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

  useEffect(() => { controlsRef.current?.update(); }, [active, edition, topView]);

  const fallbackStyle = clampIndex(active) === 2
    ? { backgroundImage: `url(/images/album-concept-${EDITIONS[clampIndex(edition, EDITIONS.length)]}.webp)` }
    : undefined;

  return (
    <div ref={hostRef} className={`${styles.stage} ${ready ? styles.ready : ""}`} aria-hidden="true">
      <div className={`${styles.fallback} ${topView ? styles.fallbackTop : ""}`}>
        <div className={`${styles.fallbackPad} ${active === 1 ? styles.artist : ""}`} style={fallbackStyle}>
          {active !== 2 && <span>KIKORA <small>{active === 1 ? "STUDIO / 001" : "GG—01"}</small></span>}
        </div>
        <div className={styles.fallbackShadow} />
      </div>
    </div>
  );
}
