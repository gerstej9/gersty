import "./SlideTile.css";

type VideoTileProps = {
  videoSrc: string;
  videoLabel: string;
};

export default function VideoTile({ videoSrc, videoLabel }: VideoTileProps) {
  return (
    <section className="slide-tile" aria-label={videoLabel}>
      <video
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
