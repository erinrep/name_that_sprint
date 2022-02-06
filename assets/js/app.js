import _css from "../css/app.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material"

import Routes from "./Routes"

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h4" noWrap component="h1" flexGrow={1}>
                Name That Sprint!
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes />
      </SnackbarProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
