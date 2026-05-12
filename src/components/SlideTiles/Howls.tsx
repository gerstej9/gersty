import howlsImage from "../../assets/howls.jpeg";
import howlsAudio from "../../assets/howls.m4a";
import "./Howls.css";

export default function JamesPlaysHowlsTile() {
  return (
    <section className="james-howls-tile">
      <h3>James Plays Howls</h3>

      <img
        className="james-howls-tile__image"
        src={howlsImage}
        alt="James Plays Howls"
      />

      <audio
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
