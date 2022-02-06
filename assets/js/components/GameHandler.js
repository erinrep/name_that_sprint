import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import GameChannel from "../contexts/GameChannel"
import Game from "../components/Game"
import { errorCodes, prettyError } from "../helpers"
import { useSnackbar } from "notistack"
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material"

const GameHandler = ({ match, history }) => {
  const [tempName, setTempName] = useState("")
  const [userName, setUserName] = useState("")
  const { enqueueSnackbar } = useSnackbar()
  const regex = /^\d+$/
  if (!regex.test(match.params.code)) {
    history.replace("/")
    return null
  }
  const topic = `game:${match.params.code}`

  return userName ? (
    <GameChannel
      topic={topic}
      userName={userName}
      onJoinError={(error) => {
        setUserName("")
        setTempName("")
        if (error == errorCodes.gameNotFound) {
          history.replace("/")
        }
        enqueueSnackbar(prettyError(error), { variant: "error" })
      }}
    >
      <Game/>
    </GameChannel>
  ) : (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <form onSubmit={(ev) => {
        ev.preventDefault()
        setUserName(tempName)
      }}>
        <Stack spacing={2} direction="row">
          <TextField
            id="user_name"
            label="Your name"
            variant="outlined"
            value={tempName}
            onChange={(ev) => setTempName(ev.currentTarget.value)}
            required
          />
          <Button variant="contained" type="submit">Join</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default withRouter(GameHandler)
