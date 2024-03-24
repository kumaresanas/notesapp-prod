import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import NotesContainer from "./components/Notes/NotesContainer";

const App = () => (
  <React.StrictMode>
   <NotesContainer />
   </React.StrictMode>
);
ReactDOM.render(<App />, document.getElementById("app"));
