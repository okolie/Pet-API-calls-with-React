import React, { useState } from "react";
import { Router, Link } from "@reach/router";
// import ReactDOM from "react-dom";
import { render } from "react-dom";
// import { Pet } from "./Pet";
// import Pet from "./Pet";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  // return React.createElement("div", {}, [
  //   React.createElement("h1", {}, "Adopt me, people!"),
  //   // React.createElement("h1", {}, "Adopt me!"),

  //   React.createElement(Pet, {
  //     name: "Luna",
  //     animal: "Dog",
  //     breed: "Havanese",
  //   }),
  //   React.createElement(Pet, {
  //     name: "Pepper",
  //     animal: "Bird",
  //     breed: "Cockatiel",
  //   }),
  //   React.createElement(Pet, {
  //     name: "Doink",
  //     animal: "Cat",
  //     breed: "Mixed",
  //   }),
  // ]);

  const themeHook = useState("darkblue");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt me, people!</Link>
          </header>

          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

// ReactDOM.render(React.createElement(App), document.getElementById("root"));
// render(React.createElement(App), document.getElementById("root"));
render(<App />, document.getElementById("root"));
