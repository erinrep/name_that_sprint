import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { SocketContext } from './Socket'

export const GameChannelContext = createContext({})

const GameChannel = ({ topic, userName, onJoinError, children }) => {
  const socket = useContext(SocketContext)
  const [gameChannel, setGameChannel] = useState(null)
  const [players, setPlayers] = useState([])
  const [ideas, setIdeas] = useState([])

  const sendIdea = (name) => {
    if (gameChannel) {
      gameChannel.push('idea', {name: name})
        .receive('ok', (resp) => console.log('idea success', resp))
        .receive('error', (resp) => console.error('idea error', resp))
        .receive('timeout', () => console.error('idea timeout'))
    } else {
      console.error('Channel not connected')
    }
  }

  useEffect(() => {
    if (socket && !gameChannel) {
      const channel = socket.channel(topic, {user_name: userName})

      channel.on('player_joined', ({users}) => {
        console.log("player joined", users)
        setPlayers(users)
      })

      channel.on('player_left', ({users}) => {
        console.log("player left", users)
        setPlayers(users)
      })

      console.debug('Joining channel', topic)
      channel.join()
        .receive('ok', (resp) => {
          setIdeas(resp.ideas)
        })
        .receive('error', (error) => {
          console.error('GameChannel join failed', topic, error)
          onJoinError(error.reason)
        })

      setGameChannel(channel)
    }

    return () => {
      if (gameChannel) {
        console.debug('Leaving channel', topic)
        gameChannel.leave()
        setGameChannel(null)
      }
    }
  }, [socket, gameChannel])

  useEffect(() => {
    if (gameChannel) {
      gameChannel.off('idea_received')
      gameChannel.on('idea_received', ({idea}) => {
        setIdeas([...ideas, idea])
      })
    }
  }, [ideas])

  return (
    <GameChannelContext.Provider value={{
      sendIdea: sendIdea,
      players: players,
      topic: topic,
      ideas: ideas
    }}>
      {children}
    </GameChannelContext.Provider>
  )
}

export default GameChannel
