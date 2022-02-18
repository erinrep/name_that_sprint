import _css from "../css/app.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { CssBaseline } from "@mui/material"
import Routes from "./Routes"
import SettingsDrawerContext from "./contexts/SettingsDrawer"
import Header from "./components/Header"

export default function App(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [showToggle, setShowToggle] = React.useState(false)

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  const setToggleVisibility = (value) => {
    setShowToggle(value)
  }

  return (
    <Router>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <SettingsDrawerContext.Provider value={{mobileOpen, toggleDrawer, showToggle, setToggleVisibility}}>
          <Header />
          <Routes />
        </SettingsDrawerContext.Provider>
      </SnackbarProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
