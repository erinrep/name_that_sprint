import React, { useState, useContext } from "react"
import { withRouter } from "react-router"
import { LobbyChannelContext } from "../contexts/LobbyChannel"
import {Box, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material"
import PhoenixLogo from "./PhoenixLogo"

const Lobby = (props) => {
  const [roomCode, setRoomCode] = useState("")
  const { startGame } = useContext(LobbyChannelContext)

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Container maxWidth="sm" sx={{marginLeft: "0px"}}>
        <Stack spacing={4}>
          <Typography>You&apos;ve planned your sprint and now you just need a name!<br/> But naming things is hard.</Typography>
          <Typography variant="h4" component="h2">Start Game</Typography>
          <Button variant="contained" onClick={() => {
            startGame((newRoomCode) => {
              props.history.push(`/game/${newRoomCode}`, {creator: true})
            })
          }}>Go!</Button>

          <Typography variant="h4" component="h2">Join Game</Typography>
          <form onSubmit={(ev)=> {
            ev.preventDefault()
            props.history.push(`/game/${roomCode}`)
          }}>
            <Stack spacing={1}>
              <TextField
                id="room_code"
                label="Room Code"
                variant="outlined"
                value={roomCode}
                onChange={(ev) => setRoomCode(ev.currentTarget.value)}
              />
              <Button variant="contained" type="submit">Join!</Button>
            </Stack>
          </form>
          <PhoenixLogo />
        </Stack>
      </Container>
    </Box>
  )
}

export default withRouter(Lobby)