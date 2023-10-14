import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProductIndex from "./components/ProductIndex";

function App() {
  return (
    <>
      <Navigation />
      <ProductIndex />
    </>
  );
}

export default App;