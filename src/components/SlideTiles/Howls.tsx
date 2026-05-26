import { useEffect, useRef } from "react";
import howlsImage from "../../assets/howls.jpeg";
import howlsAudio from "../../assets/Howls.m4a";
import "./Howls.css";

export default function JamesPlaysHowlsTile({ isActive = false }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isActive) {
      audio.currentTime = 0;
      audio.volume = 0.35;

      audio.play().catch(() => {
        // Browser may block autoplay with sound.
        // User can still press play manually.
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isActive]);

  return (
    <section className="james-howls-tile">
      <h3>James Plays Howls</h3>

      <img
        className="james-howls-tile__image"
        src={howlsImage}
        alt="James Plays Howls"
      />

      <audio
        ref={audioRef}
        className="james-howls-tile__audio"
        controls
        controlsList="nodownload noplaybackrate"
        preload="metadata"
        onContextMenu={(event) => event.preventDefault()}
      >
        <source src={howlsAudio} type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}
