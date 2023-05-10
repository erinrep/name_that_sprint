import React from "react"
import { Switch, Route } from "react-router-dom"
import Lobby from "./components/Lobby"
import GameHandler from "./components/GameHandler"
import Socket from "./contexts/Socket"
import LobbyChannel from "./contexts/LobbyChannel"

const Routes = () => {
  return (
    <Socket>
      <Switch>
        <Route path="/game/:code">
          <GameHandler />
        </Route>
        <Route path='/'>
          <LobbyChannel>
            <Lobby />
          </LobbyChannel>
        </Route>
      </Switch>
    </Socket>
  )
}

export default Routes