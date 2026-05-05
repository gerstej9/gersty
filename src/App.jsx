import "./App.css";
import GooeyCursor from "./components/Gooey";
import ImageTile from "./components/ImageTile";
import titleImage from "./assets/titleImage.png";

function App() {
  return (
    <>
      <GooeyCursor />

      <main className="page-wrap">
        <section className="hero">
          {/* <p className="eyebrow">Mobile-first interaction demo</p> */}

          <h1>
            DATE
            <br />
            JAMES G
          </h1>
          <ImageTile
            src={titleImage}
            alt="Open information tile"
            title="Tile Content"
          >
            <p>Your overlay content goes here.</p>
          </ImageTile>
          {/* <p>
            On phones, the goo moves on its own when idle. Touch or drag
            anywhere to pull it toward your finger.
          </p> */}
        </section>
      </main>
    </>
  );
}

export default App;
