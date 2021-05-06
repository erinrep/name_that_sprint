import React, { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { SocketContext } from "./Socket"
import { errorCodes, prettyError } from "../helpers"

export const LobbyChannelContext = createContext({})

const LobbyChannel = ({ children }) => {
  const socket = useContext(SocketContext)
  const [lobbyChannel, setLobbyChannel] = useState(null)
  const topic = "lobby:default"

  const startGame = (callback) => {
    lobbyChannel && lobbyChannel.push("new_game")
      .receive("ok", ({ room_code }) => callback(room_code))
      .receive("error", ({ reason }) => toast.error(prettyError(reason), { position: "top-center" }))
      .receive("timeout", () => toast.error(prettyError(errorCodes.timeout), { position: "top-center" }))
  }

  useEffect(() => {
    if (socket && !lobbyChannel) {
      const channel = socket.channel(topic)
      channel.join().receive("error", () => {
        toast.error("Error: Could not join Lobby", { position: "top-center" })
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
