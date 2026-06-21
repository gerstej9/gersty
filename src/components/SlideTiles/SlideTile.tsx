import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import type { ReactNode } from "react";
import "./SlideTile.css";

type SlideTileProps = {
  imageSrc?: string;
  imageAlt?: string;
  slideTitle?: string;
  href?: string;
  imageTone?: "default" | "ivory-black";
  children?: ReactNode;
};

export default function SlideTile({
  imageSrc,
  imageAlt = "",
  slideTitle,
  href,
  imageTone = "default",
  children,
}: SlideTileProps) {
  const imageElement = imageSrc ? (
    <img
      className={
        imageTone === "ivory-black"
          ? "slide-tile__image slide-tile__image--ivory-black"
          : "slide-tile__image"
      }
      src={imageSrc}
      alt={imageAlt}
    />
  ) : null;

  const imageContent = imageElement && (
    <div className="slide-tile__link-inner">
      <span className="slide-tile__image-frame">
        {imageElement}

        {href && (
          <span className="slide-tile__link-badge" aria-hidden="true">
            <FontAwesomeIcon icon={faCirclePlay} />
          </span>
        )}
      </span>
    </div>
  );

  return (
    <section className="slide-tile">
      {slideTitle && <h3>{slideTitle}</h3>}

      {href && imageContent ? (
        <a
          className="slide-tile__link"
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${imageAlt || slideTitle || "link"}`}
        >
          {imageContent}
        </a>
      ) : (
        imageContent
      )}

      {children && <div className="slide-tile__content">{children}</div>}
    </section>
  );
}
