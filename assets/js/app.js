import _css from "../css/app.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { SnackbarProvider } from "notistack"

import Routes from "./Routes"

export default function App() {
  return (
    <Router>
      <SnackbarProvider maxSnack={3}>
        <div>
          <header>
            <h1>Name That Sprint!</h1>
            <a href="https://www.phoenixframework.org/" target="_BLANK" rel="noreferrer">
              <img
                src="../images/phoenix-powered.png"
                alt="Phoenix Powered text next to Phoenix logo"
                width="150px"
              />
            </a>
          </header>
          <Routes />
        </div></SnackbarProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
