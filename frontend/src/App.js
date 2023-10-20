import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProductIndex from "./components/ProductIndex";
import ProductShow from "./components/ProductShow";
import Cart from "./components/Cart";
import ProductCategory from "./components/ProductCategory/productCategory";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path = "/" component={ProductIndex}/>
        <Route exact path = "/category/:categoryId" component={ProductCategory}/>
        <Route exact path = "/products/:productId" component={ProductShow}/>
        <Route exact path = "/cart" component={Cart} />
      </Switch>
    </>
  );
}

export default App;