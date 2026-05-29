import "./App.css";
import { useEffect } from "react";
import GooeyCursor from "./components/Gooey/Gooey";
import ImageTile from "./components/ImageTile/ImageTile";
import InstagramLink from "./components/InstagramLink/InstagramLink";
import JamesPlaysHowlsTile from "./components/SlideTiles/Howls";
import SlideTile from "./components/SlideTiles/SlideTile";
import titleImage from "./assets/titleImage.png";
import jamesTwo from "./assets/IMG_1097.jpeg";
import VideoTile from "./components/SlideTiles/VideoTile";
import artVideo from "./assets/artVideo.mov";
import cornerRaccoon from "./assets/cornerRaccoon.png";

function App() {
  useEffect(() => {
    function clearActiveTargets() {
      document
        .querySelectorAll(".is-touch-hovered")
        .forEach((element) => element.classList.remove("is-touch-hovered"));
    }

    function handlePointerMove(event: { clientX: number; clientY: number }) {
      clearActiveTargets();

      const element = document.elementFromPoint(event.clientX, event.clientY);
      const target = element?.closest(".tap-highlight-target");

      if (target) {
        target.classList.add("is-touch-hovered");
      }
    }

    function handlePointerEnd() {
      clearActiveTargets();
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerMove);
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
    };
  }, []);

  return (
    <>
      <GooeyCursor />

      <main className="page-wrap">
        <section className="hero">
          <div className="hero-content">
            <h1>
              EXPERIENCE
              <br />
              JAMES G
            </h1>

            <InstagramLink href="https://www.instagram.com/datejamesg/" />

            <ImageTile
              src={titleImage}
              alt="Open tile carousel"
              slides={[
                <JamesPlaysHowlsTile />,
                <SlideTile imageSrc={jamesTwo} imageAlt="James G" />,
                <VideoTile videoSrc={artVideo} videoLabel="James G" />,
                <div className="tile-card-content">
                  <h3>Third Tile</h3>
                  <p>Swipe left or right to move between these tiles.</p>
                </div>,
              ]}
            />
          </div>
          <img
            className="corner-raccoon"
            src={cornerRaccoon}
            alt=""
            aria-hidden="true"
          />
        </section>
      </main>
    </>
  );
}

export default App;
