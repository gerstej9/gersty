import "./App.css";
import GooeyCursor from "./components/Gooey/Gooey";
import ImageTile from "./components/ImageTile/ImageTile";
import InstagramLink from "./components/InstagramLink/InstagramLink";
import JamesPlaysHowlsTile from "./components/SlideTiles/Howls";
import SlideTile from "./components/SlideTiles/SlideTile";
import titleImage from "./assets/titleImage.PNG";
import jamesOne from './assets/IMG_0105.jpg';
import jamesTwo from './assets/IMG_9544.jpeg';
import VideoTile from "./components/SlideTiles/VideoTile";
import artVideo from './assets/artVideo.mp4';
// import raccoon from "./assets/raccoon.png";

function App() {
  return (
    <>
      <GooeyCursor />

      <main className="page-wrap">
        <section className="hero">
          <div className="hero-content">
            <h1>
              I AM
              <br />
              JAMES G
            </h1>

            <InstagramLink href="https://www.instagram.com/YOUR_USERNAME/" />

            <ImageTile
              src={titleImage}
              alt="Open tile carousel"
              title="More Info"
              slides={[
                <JamesPlaysHowlsTile />,
                <SlideTile imageSrc={jamesOne} imageAlt="James G" />,
                <SlideTile imageSrc={jamesTwo} imageAlt="James G" />,
                <VideoTile videoSrc={artVideo} videoLabel="James G" />,
                <div className="tile-card-content">
                  <h3>Third Tile</h3>
                  <p>Swipe left or right to move between these tiles.</p>
                </div>,
              ]}
            />
          </div>
        </section>
        {/* Raccoon Animation Here */}
        {/* <img
          className="corner-raccoon"
          src={raccoon}
          alt=""
          aria-hidden="true"
        /> */}
      </main>
    </>
  );
}

export default App;