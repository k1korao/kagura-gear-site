"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let animationFrame = 0;

    const setScrollProgress = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const handlePointerMove = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(setScrollProgress);
    };

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealTargets.forEach((target) => revealObserver.observe(target));

    const tiltTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const removeTiltHandlers = tiltTargets.map((target) => {
      const handleMove = (event: PointerEvent) => {
        const rect = target.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * 7;
        const rotateY = (x - 0.5) * 9;

        target.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
        target.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
        target.style.setProperty("--shine-x", `${(x * 100).toFixed(2)}%`);
        target.style.setProperty("--shine-y", `${(y * 100).toFixed(2)}%`);
      };

      const resetTilt = () => {
        target.style.setProperty("--tilt-x", "0deg");
        target.style.setProperty("--tilt-y", "0deg");
        target.style.setProperty("--shine-x", "50%");
        target.style.setProperty("--shine-y", "50%");
      };

      target.addEventListener("pointermove", handleMove);
      target.addEventListener("pointerleave", resetTilt);
      resetTilt();

      return () => {
        target.removeEventListener("pointermove", handleMove);
        target.removeEventListener("pointerleave", resetTilt);
      };
    });

    setScrollProgress();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", setScrollProgress);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setScrollProgress);
      revealObserver.disconnect();
      removeTiltHandlers.forEach((remove) => remove());
    };
  }, [pathname]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-spotlight" aria-hidden="true" />
    </>
  );
}
