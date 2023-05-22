defmodule NameThatSprintWeb.LobbyChannelTest do
  use NameThatSprintWeb.ChannelCase
  alias NameThatSprintWeb.UserSocket

  describe "join/3 success" do
    test "ok when lobby:default" do
      assert {:ok, _, %Phoenix.Socket{}} =
               socket(UserSocket, nil, %{})
               |> subscribe_and_join("lobby:default", %{})
    end
  end

  describe "handle_in new_game" do
    test "can start a game" do
      assert {:ok, _, socket} =
               socket(UserSocket, nil, %{})
               |> subscribe_and_join("lobby:default", %{})

      ref = push(socket, "new_game")
      assert_reply ref, :ok, %{room_code: _room_code}
    end
  end
end
