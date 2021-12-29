import React from "react";
import Field from "./features/fields/Field";
import PaintedFieldsList from "./features/fields/PaintedFieldsList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Field />
      <PaintedFieldsList />
    </div>
  );
}

export default App;
