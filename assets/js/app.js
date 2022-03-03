import _css from "../css/app.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline, useMediaQuery } from "@mui/material"
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

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
  )

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <SettingsDrawerContext.Provider value={{mobileOpen, toggleDrawer, showToggle, setToggleVisibility}}>
            <Header />
            <Routes />
          </SettingsDrawerContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
