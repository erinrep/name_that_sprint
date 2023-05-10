import React from "react"
import { render } from "@testing-library/react"
import Game from "./Game"
import GameChannel from "../contexts/GameChannel"

describe("Game Component", () => {
  it("renders without crashing", () => {
    const { queryByText } = render(
      <Game />,
    )

    expect(queryByText("Room Code:")).toBeTruthy()
  })

  it("renders with room code", () => {
    const { queryByText } = render(
      <GameChannel
        topic="game:123"
        userName="Veronica"
        onJoinError={jest.fn()}
      >
        <Game />
      </GameChannel>,
    )

    expect(queryByText("Room Code: 123")).toBeTruthy()
  })
})