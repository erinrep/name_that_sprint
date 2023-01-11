import React from "react"
import { Container, useMediaQuery } from "@mui/material"

const PhoenixLogo = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  return (
    <Container sx={{textAlign: "center"}}>
      <a href="https://www.phoenixframework.org/" target="_BLANK" rel="noreferrer">
        <img
          src={`../images/phoenix-powered${prefersDarkMode ? "-dark" : ""}.png`}
          alt="Phoenix Powered text next to Phoenix logo"
          style={{marginTop: "10px"}}
          width="150px"
        />
      </a>
    </Container>
  )
}

export default PhoenixLogo