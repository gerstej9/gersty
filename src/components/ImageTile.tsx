import { useEffect, useState } from "react";
import "./ImageTile.css";

type ImageTileProps = {
  src: string;
  alt: string;
  title?: string;
  children: React.ReactNode;
};

export default function ImageTile({
  src,
  alt,
  title,
  children,
}: ImageTileProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
            onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
              aria-label="Close tile"
            >
              ×
            </button>

            {title && <h2>{title}</h2>}

            <div className="image-tile-panel__content">{children}</div>
          </section>
        </div>
      )}
    </>
  );
}
