import "./App.css";
import GooeyCursor from "./components/Gooey/Gooey";
import ImageTile from "./components/ImageTile/ImageTile";
import InstagramLink from "./components/InstagramLink/InstagramLink";
import JamesPlaysHowlsTile from "./components/SlideTiles/Howls";
import titleImage from "./assets/titleImage.png";
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
                <div className="tile-card-content">
                  <h3>First Tile</h3>
                  <p>This is the first embedded tile.</p>
                </div>,
                <div className="tile-card-content">
                  <h3>Second Tile</h3>
                  <p>This could be a message, image, video, or link.</p>
                </div>,
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