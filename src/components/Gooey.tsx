import { useEffect, useRef } from 'react';
import './Gooey.css';

const TAIL_LENGTH = 28;

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

  const pointerRef = useRef<Point>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.45 : 0,
  });

  const historyRef = useRef<Point[]>(
    typeof window !== 'undefined'
      ? createInitialHistory()
      : Array.from({ length: TAIL_LENGTH }, () => ({ x: 0, y: 0 })),
  );

  const animationFrameRef = useRef<number | null>(null);
  const isTouchingRef = useRef(false);
  const idleStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const isTouchLikeDevice = window.matchMedia(
      '(hover: none), (pointer: coarse)',
    ).matches;

    function setPointerPosition(x: number, y: number) {
      pointerRef.current.x = x;
      pointerRef.current.y = y;
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

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight * 0.45;

      const radiusX = isTouchLikeDevice ? 42 : 60;
      const radiusY = isTouchLikeDevice ? 28 : 40;

      pointerRef.current.x =
        centerX +
        Math.cos(elapsed * 0.85) * radiusX +
        Math.sin(elapsed * 1.35) * 12;

      pointerRef.current.y =
        centerY +
        Math.sin(elapsed * 0.85) * radiusY +
        Math.cos(elapsed * 1.15) * 10;
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

        current.x += xDiff * 0.35;
        current.y += yDiff * 0.35;

        const circle = circles[i];

        if (circle) {
          const scale = i / TAIL_LENGTH;

          circle.style.transform = `
            translate3d(${current.x}px, ${current.y}px, 0)
            translate3d(-50%, -50%, 0)
            scale(${scale})
          `;
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateCursor);
    }

    window.addEventListener('resize', handleResize);

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);

    animationFrameRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('resize', handleResize);

      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);

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
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="6"
              result="blur"
            />
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