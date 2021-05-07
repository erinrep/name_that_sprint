import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { toast } from "react-toastify"
import GameChannel from "../contexts/GameChannel"
import Game from "../components/Game"
import { errorCodes, prettyError } from "../helpers"

const GameHandler = ({ match, history }) => {
  const [tempName, setTempName] = useState("")
  const [userName, setUserName] = useState("")
  const regex = /^\d+$/
  if (!regex.test(match.params.code)) {
    history.replace("/")
    return null
  }
  const topic = `game:${match.params.code}`

  return userName ? (
    <GameChannel
      topic={topic}
      userName={userName}
      onJoinError={(error) => {
        setUserName("")
        setTempName("")
        if (error == errorCodes.gameNotFound) {
          history.replace("/")
        }
        toast.error(prettyError(error), { position: "top-center" })
      }}
    >
      <Game/>
    </GameChannel>
  ) : (
    <div>
      <form onSubmit={(ev) => {
        ev.preventDefault()
        setUserName(tempName)
      }}>
        <label>What should we call you?{" "}
          <input
            name="user_name"
            value={tempName}
            onChange={(ev) => setTempName(ev.currentTarget.value)}
            required
          />
        </label>
        <button className="margin-left-1" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default withRouter(GameHandler)
