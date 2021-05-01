import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router'
import { LobbyChannelContext } from '../contexts/LobbyChannel'

const Lobby = (props) => {
  const [roomCode, setRoomCode] = useState("")
  const { startGame } = useContext(LobbyChannelContext)

  return (
    <div>
      <h2>Start a Game</h2>
      <button onClick={() => {
        startGame((newRoomCode) => {
          props.history.push(`/game/${newRoomCode}`)
        })
      }}>Go!</button>

      <h2>Join a Game</h2>
      <form onSubmit={(ev)=> {
        ev.preventDefault()
        props.history.push(`/game/${roomCode}`)
      }}>
        <label>Room Code
          <input
            name="room_code"
            value={roomCode}
            onChange={(ev) => setRoomCode(ev.currentTarget.value)}>
          </input>
        </label>
        <button type="submit">Join</button>
      </form>
    </div>
  )
}

export default withRouter(Lobby)