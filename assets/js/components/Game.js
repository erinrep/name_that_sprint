import React, { useContext, useState } from 'react'
import { GameChannelContext } from '../contexts/GameChannel'

const Game = () => {
  const [idea, setIdea] = useState("")
  const { 
    userName,
    sendIdea,
    players = [],
    topic = "",
    ideas = [],
    isLeader,
    votingMode,
    setVotingMode,
    sendVote,
    getSuggestion,
    error
  } = useContext(GameChannelContext)
  const roomCode = topic.split(":")[1]

  return (
    <div>
      <h2>Room Code: {roomCode}</h2>

      {error && <p>{error}</p>}

      {votingMode ? (
        <p>Vote for your favorites</p>
      ) : (
        <>
          <p>
            Submit ideas for the name of the sprint.
          </p>

          <div>
            <form onSubmit={(ev) => {
              ev.preventDefault()
              sendIdea(idea)
              setIdea("")
            }}>
              <input
                size={50}
                name="idea"
                aria-label="idea for sprint name"
                value={idea}
                onChange={(ev) => {
                  setIdea(ev.currentTarget.value)
                }}
                required
              />
              <p><button type="submit">Submit Idea</button></p>
            </form>
            <button onClick={() => {
              getSuggestion((suggestion) => {
                setIdea(suggestion)
              })
            }}>Get Suggestion</button>
          </div>
        </>
      )}

      <div>
        <h3>Ideas</h3>
        <ol className="ideas">
          {ideas.map(({name, votes}) => {
            return (
              <li key={name}>
                <span aria-hidden="true">{name}</span>
                {votingMode && (
                  <>
                    <button
                      className="margin-left-1"
                      aria-label={`Add vote for ${name}`}
                      onClick={() => sendVote(name)}
                    >
                      +
                    </button>
                    {votes.includes(userName) && 
                      <button
                        className="margin-left-1"
                        aria-label={`Remove vote for ${name}`}
                        onClick={() => sendVote(name, false)}
                      >
                        -
                      </button>
                    }
                    <ul className="votes" aria-label={`Players who voted for ${name}`}>
                      {votes.map((user, index) => <li key={`${name}:${user}:${index}`}>{user}</li>)}
                    </ul>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      {isLeader && (
        <div>
          <h3>Settings</h3>
          <label>Entry Mode
            <input
              type="radio"
              name="mode"
              checked={!votingMode}
              onChange={(ev) => setVotingMode(false)}
            />
          </label>
          <br/>
          <label>Voting Mode
            <input
              type="radio"
              name="mode"
              checked={votingMode}
              onChange={(ev) => setVotingMode(true)}
            />
          </label>
        </div>
      )}

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
