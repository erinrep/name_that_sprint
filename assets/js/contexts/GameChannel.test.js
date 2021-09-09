import React from "react"
import {render} from "@testing-library/react"
import Game from "../components/Game"
import GameChannel from "./GameChannel"

describe("Game Channel", () => {
  it("renders without crashing", () => {
    const {queryByText} = render(
      <GameChannel><div>cool</div></GameChannel>,
    )

    expect(queryByText("cool")).toBeTruthy()
  })
  
  it("renders game info", () => {
    const {queryByText} = render(
      <GameChannel
        topic="game:123"
        userName="Veronica"
        onJoinError={jest.fn()}
      >
        <Game/>
      </GameChannel>,
    )

    expect(queryByText("Room Code: 123")).toBeTruthy()
  })
})