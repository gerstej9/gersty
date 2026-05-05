import "./App.css";
import GooeyCursor from "./components/Gooey";

function App() {
  return (
    <>
      <GooeyCursor />

      <main className="page-wrap">
        <section className="hero">
          <p className="eyebrow">Mobile-first interaction demo</p>

          <h1>
            Gooey
            <br />
            Cursor
          </h1>

          <p className="intro">
            On phones, the goo moves on its own when idle. Touch or drag
            anywhere to pull it toward your finger.
          </p>
        </section>
      </main>
    </>
  );
}

export default App;