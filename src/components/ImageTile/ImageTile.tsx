import {
  useEffect,
  useRef,
  useState,
  isValidElement,
  cloneElement,
} from "react";
import type { ReactNode } from "react";
import "./ImageTile.css";

type ImageTileProps = {
  src: string;
  alt: string;
  title?: string;
  slides: ReactNode[];
};

const SWIPE_THRESHOLD = 50;

export default function ImageTile({ src, alt, title, slides }: ImageTileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

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

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartXRef.current = event.touches[0].clientX;
    touchEndXRef.current = event.touches[0].clientX;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    touchEndXRef.current = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartXRef.current === null || touchEndXRef.current === null) {
      return;
    }

    const deltaX = touchEndXRef.current - touchStartXRef.current;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
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
            aria-label={title ?? alt}
          >
            <button
              type="button"
              className="image-tile-close"
              onClick={closeTile}
              aria-label="Close tile"
            >
              ×
            </button>

            {title && <h2 className="image-tile-title">{title}</h2>}

            <div
              className="image-tile-carousel"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="image-tile-track"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <article
                    key={index}
                    className="image-tile-slide"
                    aria-hidden={activeIndex !== index}
                  >
                    {isValidElement(slide)
                      ? cloneElement(slide, {
                          isActive: activeIndex === index,
                        } as { isActive: boolean })
                      : slide}
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
