import { useEffect, useRef } from "react";
import "./SlideTile.css";

type VideoTileProps = {
  videoSrc: string;
  videoLabel: string;
  isActive?: boolean;
};

export default function VideoTile({
  videoSrc,
  videoLabel,
  isActive = false,
}: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isActive) {
      video.currentTime = 0;
      video.volume = 0.35;

      video.play().catch(() => {
        // Some browsers block autoplay with sound.
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  return (
    <section className="slide-tile" aria-label={videoLabel}>
      <video
        ref={videoRef}
        className="slide-tile__video"
        src={videoSrc}
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        loop
        playsInline
        preload="metadata"
        onContextMenu={(event) => event.preventDefault()}
      >
        Your browser does not support the video element.
      </video>
    </section>
  );
}
