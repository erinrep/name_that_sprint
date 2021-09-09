import React, { useContext, useState } from "react"

const LeaderActions = ({
  ideas,
  votingMode,
  setVotingMode,
  declareWinner
}) => {
  return (
    <form>
      <label>Entry Mode
        <input
          type="radio"
          name="mode"
          checked={!votingMode}
          onChange={(ev) => {
            ev.preventDefault()
            setVotingMode(false)
          }}
        />
      </label>
      <br/>
      <label>Voting Mode
        <input
          type="radio"
          name="mode"
          checked={votingMode}
          onChange={(ev) => {
            ev.preventDefault()
            setVotingMode(true)
          }}
        />
      </label>
      <br />
      {!!ideas.find(idea => idea.votes.length) && (
        <p>
          <button onClick={(ev) => {
            ev.preventDefault()
            declareWinner()
          }}>
            Declare Winner
          </button>
        </p>
      )}
    </form>
  )
}

export default LeaderActions
