import React, { createContext, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import GameChannel from '../contexts/GameChannel'
import Game from '../components/Game'

export const GameChannelContext = createContext({})

const GameHandler = ({ match, history }) => {
  const [tempName, setTempName] = useState("")
  const [userName, setUserName] = useState("")
  const [error, setError] = useState("")
  const regex = /^\d+$/
  if (!regex.test(match.params.code)) {
    history.replace("/")
    return null
  }
  const topic = `game:${match.params.code}`

  return error == "game_not_found" ? (
    <div>
      <p>Error: Game not found</p>
      <Link to="/">Go to lobby</Link>
    </div>
  ) : userName ? (
    <GameChannel
      topic={topic}
      userName={userName}
      onJoinError={(error) => {
        setUserName("")
        setTempName("")
        setError(error)
      }}
    >
      <Game/>
    </GameChannel>
  ) : (
    <div>
      {error && <p>Error: name in use</p>}
      <form onSubmit={(ev) => {
        ev.preventDefault()
        setUserName(tempName)
        setError("")
      }}>
        <label>What is your name? 
          <input
            name="user_name"
            value={tempName}
            onChange={(ev) => setTempName(ev.currentTarget.value)}>
          </input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default withRouter(GameHandler)
