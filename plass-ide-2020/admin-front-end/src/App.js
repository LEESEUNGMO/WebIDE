import React, { Component } from "react";
import "./resources/scss/main.scss";
import "./resources/css/grid.css";
import { Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Routes from "./router/routes";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Routes />
        </Switch>
        <Footer />
      </>
    );
  }
}
export default App;
