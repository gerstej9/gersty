"use-client";
import { useEffect, useRef } from "react";
import "./Gooey.css";

const TAIL_LENGTH = 40;

type Point = {
  x: number;
  y: number;
};

function getIdlePoint(): Point {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight * 0.45,
  };
}

function createInitialHistory(): Point[] {
  const initialPoint = getIdlePoint();

  return Array.from({ length: TAIL_LENGTH }, () => ({
    x: initialPoint.x,
    y: initialPoint.y,
  }));
}

export default function Gooey() {
  const circlesRef = useRef<Array<HTMLDivElement | null>>([]);
  const idleCenterRef = useRef<Point>({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight * 0.45 : 0,
  });
  const pointerRef = useRef<Point>({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight * 0.45 : 0,
  });

  const historyRef = useRef<Point[]>(
    typeof window !== "undefined"
      ? createInitialHistory()
      : Array.from({ length: TAIL_LENGTH }, () => ({ x: 0, y: 0 })),
  );

  const animationFrameRef = useRef<number | null>(null);
  const isTouchingRef = useRef(false);
  const idleStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isTouchLikeDevice = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    function setPointerPosition(x: number, y: number) {
      pointerRef.current.x = x;
      pointerRef.current.y = y;

      if (isTouchingRef.current) {
        idleCenterRef.current.x = x;
        idleCenterRef.current.y = y;
      }
    }

    function resetToIdlePosition() {
      const idlePoint = getIdlePoint();
      setPointerPosition(idlePoint.x, idlePoint.y);
    }

    function scatterHistory(amount = 70) {
      historyRef.current = historyRef.current.map((point) => ({
        x: point.x + Math.random() * amount - amount / 2,
        y: point.y + Math.random() * amount - amount / 2,
      }));
    }

    function handleResize() {
      if (!isTouchingRef.current) {
        resetToIdlePosition();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      isTouchingRef.current = true;
      idleStartTimeRef.current = null;

      setPointerPosition(event.clientX, event.clientY);
      scatterHistory(80);
    }

    function handlePointerMove(event: PointerEvent) {
      if (isTouchLikeDevice && !isTouchingRef.current) {
        return;
      }

      setPointerPosition(event.clientX, event.clientY);

      idleCenterRef.current.x = event.clientX;
      idleCenterRef.current.y = event.clientY;
    }

    function handlePointerUp() {
      isTouchingRef.current = false;
      idleStartTimeRef.current = performance.now();
    }

    function updateIdleMotion(timestamp: number) {
      if (prefersReducedMotion || isTouchingRef.current) {
        return;
      }

      if (idleStartTimeRef.current === null) {
        idleStartTimeRef.current = timestamp;
      }

      const elapsed = (timestamp - idleStartTimeRef.current) / 1000;

      const centerX = idleCenterRef.current.x;
      const centerY = idleCenterRef.current.y;

      // tighter, more circular orbit
      const radius = isTouchLikeDevice ? 18 : 24;
      const angularSpeed = 1.35;

      // optional tiny harmonic wobble for a soft yin-yang feel
      const wobble = isTouchLikeDevice ? 2 : 3;

      pointerRef.current.x =
        centerX + Math.cos(elapsed * angularSpeed) * radius;

      pointerRef.current.y =
        centerY + Math.sin(elapsed * angularSpeed) * radius;
    }

    function updateCursor(timestamp: number) {
      updateIdleMotion(timestamp);

      const history = historyRef.current;
      const pointer = pointerRef.current;
      const circles = circlesRef.current;

      history.shift();
      history.push({
        x: pointer.x,
        y: pointer.y,
      });

      for (let i = 0; i < TAIL_LENGTH; i += 1) {
        const current = history[i];
        const next = history[i + 1] || history[TAIL_LENGTH - 1];

        if (!current || !next) {
          continue;
        }

        const xDiff = next.x - current.x;
        const yDiff = next.y - current.y;

        const isIdle = !isTouchingRef.current;
        const followStrength = isIdle ? 0.12 : 0.22;

        current.x += xDiff * followStrength;
        current.y += yDiff * followStrength;

        const circle = circles[i];

        if (circle) {
          const progress = i / (TAIL_LENGTH - 1);
          const minScale = 0.18;
          const maxScale = 1;
          let scale = minScale + progress * (maxScale - minScale);

          if (!isTouchingRef.current && i === TAIL_LENGTH - 1) {
            scale *= 1 + Math.sin(timestamp * 0.005) * 0.05;
          }

          circle.style.transform = `
    translate3d(${current.x}px, ${current.y}px, 0)
    translate3d(-50%, -50%, 0)
    scale(${scale})
  `;
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateCursor);
    }

    window.addEventListener("resize", handleResize);

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);

    animationFrameRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("resize", handleResize);

      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="goo-filter-svg"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 35 -15
              "
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="gooey-cursor" aria-hidden="true">
        {Array.from({ length: TAIL_LENGTH }).map((_, index) => (
          <div
            key={index}
            className="gooey-cursor__circle"
            ref={(element) => {
              circlesRef.current[index] = element;
            }}
          />
        ))}
      </div>
    </>
  );
}
