import React, { createContext, useContext, useEffect, useState } from "react"
import { SocketContext } from "./Socket"
import { errorCodes, prettyError } from "../helpers"
import { useSnackbar } from "notistack"

export const LobbyChannelContext = createContext({})

const LobbyChannel = ({ children }) => {
  const socket = useContext(SocketContext)
  const [lobbyChannel, setLobbyChannel] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  const topic = "lobby:default"

  const startGame = (callback) => {
    lobbyChannel && lobbyChannel.push("new_game")
      .receive("ok", ({ room_code }) => callback(room_code))
      .receive("error", ({ reason }) => enqueueSnackbar(prettyError(reason), { variant: "error" }))
      .receive("timeout", () => enqueueSnackbar(prettyError(errorCodes.timeout), { variant: "error" }))
  }

  useEffect(() => {
    if (socket && !lobbyChannel) {
      const channel = socket.channel(topic)
      channel.join().receive("error", () => {
        enqueueSnackbar("Error: Could not join Lobby", { variant: "error" })
      })

      setLobbyChannel(channel)
    }

    return () => {
      if (lobbyChannel) {
        lobbyChannel.leave()
        setLobbyChannel(null)
      }
    }
  }, [socket, lobbyChannel])

  return (
    <LobbyChannelContext.Provider value={{
      startGame: startGame
    }}>
      {children}
    </LobbyChannelContext.Provider>
  )
}

export default LobbyChannel
