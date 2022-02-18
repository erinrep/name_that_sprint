import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { SocketContext } from "./Socket"
import { errorCodes, prettyError } from "../helpers"
import { useSnackbar } from "notistack"

export const GameChannelContext = createContext({})

const GameChannel = ({ topic, userName, onJoinError, children }) => {
  const socket = useContext(SocketContext)
  const [gameChannel, setGameChannel] = useState(null)
  const [players, setPlayers] = useState([])
  const [ideas, setIdeas] = useState([])
  const [votingMode, setVotingMode] = useState(false)
  const [winner, setWinner] = useState("")
  const ideaRef = useRef([])
  const { enqueueSnackbar } = useSnackbar()

  const sendIdea = (name) => {
    gameChannel && gameChannel.push("idea", {name: name})
      .receive("error", ({reason}) => enqueueSnackbar(prettyError(reason), { variant: "error" }))
      .receive("timeout", () => enqueueSnackbar(prettyError(prettyError(errorCodes.timeout)), { variant: "error" }))
  }

  const sendModeChange = (status) => {
    gameChannel && gameChannel.push("set_voting_mode", {status: status})
      .receive("error", () => enqueueSnackbar(prettyError(), { variant: "error" }))
      .receive("timeout", () => enqueueSnackbar(prettyError(prettyError(errorCodes.timeout)), { variant: "error" }))
  }

  const sendVote = (name, add = true) => {
    gameChannel && gameChannel.push(add ? "add_vote" : "remove_vote", {user: userName, vote: name})
      .receive("error", ({reason}) => enqueueSnackbar(prettyError(reason), { variant: "error" }))
      .receive("timeout", () => enqueueSnackbar(prettyError(prettyError(errorCodes.timeout)), { variant: "error" }))
  }

  const getSuggestion = (callback) => {
    gameChannel && gameChannel.push("get_suggestion")
      .receive("ok", ({suggestion}) => callback(suggestion))
      .receive("error", () => enqueueSnackbar(prettyError(), { variant: "error" }))
      .receive("timeout", () => enqueueSnackbar(prettyError(prettyError(errorCodes.timeout)), { variant: "error" }))
  }

  const declareWinner = () => {
    gameChannel && gameChannel.push("declare_winner")
      .receive("error", ({reason}) => enqueueSnackbar(prettyError(reason), { variant: "error" }))
      .receive("timeout", () => enqueueSnackbar(prettyError(prettyError(errorCodes.timeout)), { variant: "error" }))
  }

  useEffect(() => {
    if (socket && !gameChannel) {
      const channel = socket.channel(topic, {user_name: userName})

      channel.on("player_joined", ({users, new_user}) => {
        setPlayers(users)
        if (new_user !== userName) {
          enqueueSnackbar(`${new_user} joined`, { variant: "info" })
        }
      })
      channel.on("player_left", ({users}) => setPlayers(users))
      channel.on("idea_received", (idea) => {
        ideaRef.current = [...ideaRef.current, idea]
        setIdeas(ideaRef.current)
      })
      channel.on("voting_mode_updated", ({status}) => setVotingMode(status))
      channel.on("vote_updated", (item) => {
        ideaRef.current = ideaRef.current.map((idea) => {
          return idea.name === item.name ? item : idea
        })
        setIdeas(ideaRef.current)
      })
      channel.on("winner_declared", ({winner}) => setWinner(winner))
      channel.join()
        .receive("ok", ({ideas, voting_mode, winner}) => {
          setIdeas(ideas)
          ideaRef.current = ideas
          setVotingMode(voting_mode)
          setWinner(winner)
        })
        .receive("error", (error) => onJoinError(error.reason))

      setGameChannel(channel)
    }

    return () => {
      if (gameChannel) {
        gameChannel.leave()
        setGameChannel(null)
      }
    }
  }, [socket, gameChannel])

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
      getSuggestion: getSuggestion,
      declareWinner: declareWinner,
      winner: winner
    }}>
      {children}
    </GameChannelContext.Provider>
  )
}

export default GameChannel
