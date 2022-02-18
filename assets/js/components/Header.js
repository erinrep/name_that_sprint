import React, { useContext } from "react"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

import SettingsDrawerContext from "../contexts/SettingsDrawer"

const Header = () => {
  const { toggleDrawer, showToggle } = useContext(SettingsDrawerContext)

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {showToggle && (
          <IconButton
            color="inherit"
            aria-label="open game settings drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h4" noWrap component="h1" flexGrow={1}>
          Name That Sprint!
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header