import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import "./ImageTile.css";

type ImageTileProps = {
  src: string;
  alt: string;
  slides: ReactNode[];
};

const SWIPE_THRESHOLD = 50;

export default function ImageTile({ src, alt, slides }: ImageTileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number | null>(null);

  const hasMultipleSlides = slides.length > 1;

  function goToPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
    );
  }

  function goToNext() {
    setActiveIndex((currentIndex) =>
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1,
    );
  }

  function closeTile() {
    setIsOpen(false);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    startXRef.current = event.clientX;
    currentXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (startXRef.current === null) {
      return;
    }

    currentXRef.current = event.clientX;
  }

  function handlePointerUp() {
    if (startXRef.current === null || currentXRef.current === null) {
      return;
    }

    const deltaX = currentXRef.current - startXRef.current;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    startXRef.current = null;
    currentXRef.current = null;
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) {
        return;
      }

      if (event.key === "Escape") {
        closeTile();
      }

      if (event.key === "ArrowLeft" && hasMultipleSlides) {
        goToPrevious();
      }

      if (event.key === "ArrowRight" && hasMultipleSlides) {
        goToNext();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, hasMultipleSlides]);

  return (
    <>
      <button
        type="button"
        className="image-tile-trigger"
        onClick={() => setIsOpen(true)}
        aria-label={`Open ${alt}`}
      >
        <img src={src} alt={alt} className="image-tile-trigger__image" />
      </button>

      {isOpen && (
        <div className="image-tile-overlay" role="presentation">
          <button
            type="button"
            className="image-tile-backdrop"
            aria-label="Close tile"
            onClick={closeTile}
          />

          <section
            className="image-tile-panel"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <button
              type="button"
              className="image-tile-close"
              onClick={closeTile}
              aria-label="Close tile"
            >
              ×
            </button>
            <div
              className="image-tile-carousel"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div
                className="image-tile-track"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <article
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="image-tile-slide"
                    aria-hidden={activeIndex !== index}
                  >
                    {slide}
                  </article>
                ))}
              </div>
            </div>

            {hasMultipleSlides && (
              <div className="image-tile-controls">
                <button
                  type="button"
                  className="image-tile-arrow"
                  onClick={goToPrevious}
                  aria-label="Previous tile"
                >
                  ‹
                </button>

                <div className="image-tile-dots" aria-label="Tile navigation">
                  {slides.map((_, index) => (
                    <button
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      type="button"
                      className={
                        index === activeIndex
                          ? "image-tile-dot image-tile-dot--active"
                          : "image-tile-dot"
                      }
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Go to tile ${index + 1}`}
                      aria-current={index === activeIndex}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="image-tile-arrow"
                  onClick={goToNext}
                  aria-label="Next tile"
                >
                  ›
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
