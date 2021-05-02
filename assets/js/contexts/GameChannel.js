import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { SocketContext } from './Socket'

export const GameChannelContext = createContext({})

const GameChannel = ({ topic, userName, onJoinError, children }) => {
  const socket = useContext(SocketContext)
  const [gameChannel, setGameChannel] = useState(null)
  const [players, setPlayers] = useState([])
  const [ideas, setIdeas] = useState([])
  const [votingMode, setVotingMode] = useState(false)
  const [error, setError] = useState("")

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

  const sendModeChange = (status) => {
    if (gameChannel) {
      gameChannel.push('set_voting_mode', {status: status})
        .receive('ok', () => console.log('mode success'))
        .receive('error', (resp) => console.error('mode error', resp))
        .receive('timeout', () => console.error('mode timeout'))
    } else {
      console.error('Channel not connected')
    }
  }

  const sendVote = (name, add = true) => {
    setError("")
    if (gameChannel) {
      gameChannel.push(add ? 'add_vote' : 'remove_vote', {user: userName, vote: name})
        .receive('ok', () => console.log('vote success'))
        .receive('error', ({reason}) => setError(reason))
        .receive('timeout', () => console.error('vote timeout'))
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

      channel.on('voting_mode_updated', ({status}) => {
        console.log("voting mode?", status)
        setVotingMode(status)
      })

      console.debug('Joining channel', topic)
      channel.join()
        .receive('ok', ({ideas, voting_mode}) => {
          setIdeas(ideas)
          setVotingMode(voting_mode)
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
      gameChannel.on('idea_received', (idea) => {
        setIdeas([...ideas, idea])
      })

      gameChannel.off('vote_updated')
      gameChannel.on('vote_updated', (item) => {
        console.log("vote updated", item)
        setIdeas(ideas.map((idea) => {
          return idea.name === item.name ? item : idea
        }))
      })
    }
  }, [ideas])

  return (
    <GameChannelContext.Provider value={{
      userName: userName,
      sendIdea: sendIdea,
      players: players,
      topic: topic,
      ideas: ideas,
      isLeader: players[0] == userName,
      setVotingMode: sendModeChange,
      votingMode: votingMode,
      sendVote: sendVote,
      error: error
    }}>
      {children}
    </GameChannelContext.Provider>
  )
}

export default GameChannel
