"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PRELOADER_TIMINGS, PRELOADER_SESSION_KEY } from "@/lib/motion/preloaderTokens";
import styles from "./CinematicPreloader.module.css";

type PreloaderPhase = "init" | "laser" | "split" | "exit" | "done";
type DismissReason = "complete" | "escape" | "skip" | "fallback" | "interrupted" | "timeout";

function hasSeenPreloader() {
  try {
    return window.sessionStorage.getItem(PRELOADER_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markPreloaderSeen() {
  try {
    window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
  } catch {
    // Storage can be unavailable in hardened or private browsing contexts.
  }
}

function shouldUseStaticEntry() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  const constrainedConnection =
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";

  return reducedMotion || constrainedConnection;
}

function getDevelopmentIntroMode() {
  if (process.env.NODE_ENV === "production") return null;
  if (typeof window === "undefined") return null;
  const mode = new URLSearchParams(window.location.search).get("intro");
  if (mode === "once") return "once";
  if (mode === "hold" || mode === "static" || mode === "replay") return mode;
  // Default to replay during development so refreshing the page re-triggers the preloader
  return "replay";
}

export function CinematicPreloader() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<PreloaderPhase>("init");
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const isAliveRef = useRef(false);
  const timerIdsRef = useRef<number[]>([]);

  useLayoutEffect(() => {
    const developmentIntroMode = getDevelopmentIntroMode();
    const shouldPlay =
      developmentIntroMode !== "static" &&
      (developmentIntroMode === "replay" ||
        developmentIntroMode === "hold" ||
        (!hasSeenPreloader() && !shouldUseStaticEntry()));

    if (shouldPlay) {
      document.documentElement.dataset.chaksuIntro = "eligible";
    } else {
      delete document.documentElement.dataset.chaksuIntro;
    }

    return () => {
      delete document.documentElement.dataset.chaksuIntro;
    };
  }, []);

  const clearTimers = useCallback(() => {
    timerIdsRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timerIdsRef.current = [];
  }, []);

  const dismiss = useCallback((reason: DismissReason, restoreFocus = false) => {
    clearTimers();
    markPreloaderSeen();
    delete document.documentElement.dataset.chaksuIntro;

    if (isAliveRef.current) {
      setPhase("done");
      setMounted(false);
    }

    window.dispatchEvent(
      new CustomEvent("chaksu:intro", {
        detail: { state: reason },
      }),
    );

    if (restoreFocus) {
      window.setTimeout(() => {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }, 0);
    }
  }, [clearTimers]);

  useEffect(() => {
    isAliveRef.current = true;
    const developmentIntroMode = getDevelopmentIntroMode();
    const forceDevelopmentReplay = developmentIntroMode === "replay" || developmentIntroMode === "hold";

    const schedule = (callback: () => void, delay: number) => {
      const timerId = window.setTimeout(() => {
        if (isAliveRef.current) callback();
      }, delay);
      timerIdsRef.current.push(timerId);
    };

    const cleanup = () => {
      isAliveRef.current = false;
      clearTimers();
      delete document.documentElement.dataset.chaksuIntro;
    };

    if (!forceDevelopmentReplay && hasSeenPreloader()) {
      delete document.documentElement.dataset.chaksuIntro;
      schedule(() => setPhase("done"), 0);
      return cleanup;
    }

    if (developmentIntroMode === "static" || (!forceDevelopmentReplay && shouldUseStaticEntry())) {
      markPreloaderSeen();
      window.dispatchEvent(
        new CustomEvent("chaksu:intro", {
          detail: { state: "fallback" satisfies DismissReason },
        }),
      );
      delete document.documentElement.dataset.chaksuIntro;
      schedule(() => setPhase("done"), 0);
      return cleanup;
    }

    // Defer the state change to satisfy the React effect contract while keeping
    // the server-rendered homepage fully usable when JavaScript is unavailable.
    schedule(() => {
      setMounted(true);
      window.dispatchEvent(
        new CustomEvent("chaksu:intro", {
          detail: { state: "start" },
        }),
      );
    }, 0);

    schedule(() => setPhase("laser"), PRELOADER_TIMINGS.laserMs);
    schedule(() => setPhase("split"), PRELOADER_TIMINGS.splitMs);
    if (developmentIntroMode !== "hold") {
      schedule(() => setPhase("exit"), PRELOADER_TIMINGS.exitMs);
      schedule(() => dismiss("complete"), PRELOADER_TIMINGS.doneMs);
      schedule(() => dismiss("timeout"), PRELOADER_TIMINGS.failSafeMs);
    }

    return cleanup;
  }, [clearTimers, dismiss]);

  useEffect(() => {
    if (!mounted) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousOverscrollBehavior = body.style.overscrollBehavior;
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss("escape", true);
        return;
      }

      // The intro remains decorative and does not steal focus on entry. If the
      // user navigates by keyboard while it is visible, keep focus on its one
      // visible control rather than allowing focus behind the overlay.
      if (e.key === "Tab") {
        e.preventDefault();
        skipButtonRef.current?.focus({ preventScroll: true });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        dismiss("interrupted");
      }
    };

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) dismiss("fallback");
    };

    window.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      body.style.overflow = previousOverflow;
      body.style.overscrollBehavior = previousOverscrollBehavior;
      window.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, [dismiss, mounted]);

  if (phase === "done") {
    return null;
  }

  if (!mounted) {
    return (
      <div className={styles.preloaderBoot} aria-hidden="true">
        <div className={styles.centerContent}>
          <span className={styles.wordmark}>CHAKSU</span>
          <span className={styles.metaText}>CHENNAI / DROP 001</span>
        </div>
      </div>
    );
  }

  const isAnimating = phase !== "init";
  const isLaserVisible = phase === "laser" || phase === "split";

  return (
    <div
      ref={overlayRef}
      className={styles.preloaderOverlay}
      data-phase={phase}
      data-laser={isLaserVisible}
      data-animating={isAnimating}
    >
      <button
        ref={skipButtonRef}
        type="button"
        className={styles.skipBtn}
        onClick={(event) => dismiss("skip", event.detail === 0)}
        aria-label="Skip CHAKSU introduction"
      >
        Skip Intro
      </button>

      <div className={styles.decorativeScene} aria-hidden="true">
        <svg
          className={styles.kLaser}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          focusable="false"
        >
          <line
            className={styles.kLaserLine}
            x1="0"
            y1="78"
            x2="100"
            y2="42"
          />
        </svg>

        <div className={styles.topPanel}>
          <div className={styles.centerContent}>
            <span className={styles.wordmark}>CHAKSU</span>
            <span className={styles.metaText}>CHENNAI / DROP 001</span>
          </div>
        </div>

        <div className={styles.bottomPanel}>
          <div className={styles.centerContent}>
            <span className={styles.wordmark}>CHAKSU</span>
            <span className={styles.metaText}>CHENNAI / DROP 001</span>
          </div>
        </div>
      </div>
    </div>
  );
}
