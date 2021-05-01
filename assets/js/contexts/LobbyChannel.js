import React, { createContext, useContext, useEffect, useState } from 'react'
import { SocketContext } from './Socket'

export const LobbyChannelContext = createContext({})

const LobbyChannel = ({ children }) => {
  const socket = useContext(SocketContext)
  const [lobbyChannel, setLobbyChannel] = useState(null)
  const [error, setError] = useState("")
  const topic = "lobby:default";

  const startGame = (callback) => {
    if (lobbyChannel) {
      setError("")
      lobbyChannel.push('new_game')
        .receive('ok', (resp) => callback(resp.room_code))
        .receive('error', (resp) => setError(`Error: ${resp.reason}`))
        .receive('timeout', () => console.error('timeout creating game'))
    } else {
      console.error('Channel not connected')
    }
  }

  useEffect(() => {
    if (socket && !lobbyChannel) {
      const channel = socket.channel(topic)

      console.debug('Joining channel', topic)
      channel.join().receive('error', () => {
        setError("Error: Could not join Lobby")
      })

      setLobbyChannel(channel)
    }

    return () => {
      if (lobbyChannel) {
        console.debug('Leaving channel', topic)
        lobbyChannel.leave()
        setLobbyChannel(null)
      }
    }
  }, [socket, lobbyChannel])

  return (
    <LobbyChannelContext.Provider value={{
      startGame: startGame
    }}>
      {error && <p className="error">{error}</p>}
      {children}
    </LobbyChannelContext.Provider>
  )
}

export default LobbyChannel
