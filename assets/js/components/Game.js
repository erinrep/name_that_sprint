import React, { useContext, useState } from 'react'
import { GameChannelContext } from '../contexts/GameChannel'

const Game = () => {
  const [idea, setIdea] = useState("")
  const { sendIdea, players, topic, ideas } = useContext(GameChannelContext)
  const roomCode = topic.split(":")[1]

  return (
    <div>
      <h2>Room Code: {roomCode}</h2>

      <p>
        Submit ideas for the name of the sprint.
      </p>

      <div>
        <form onSubmit={(ev) => {
          ev.preventDefault()
          sendIdea(idea)
          setIdea("")
        }}>
          <input name="idea" aria-label="idea for sprint name" value={idea} onChange={(ev) => {
            setIdea(ev.currentTarget.value)
          }}></input>
          <br/>
          <button type="submit">Submit Idea</button>
        </form>
      </div>

      <div>
        <h3>Ideas</h3>
        <ul>
          {ideas.map((name) => {
            return (
              <li key={name}>{name}</li>
            )
          })}
        </ul>
      </div>

      <div>
        <h3>Players</h3>
        <ul>
          {players.map((player) => <li key={player}>{player}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Game
