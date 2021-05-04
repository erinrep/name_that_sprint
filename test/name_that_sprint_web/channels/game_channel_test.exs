defmodule NameThatSprintWeb.GameChannelTest do 
  use NameThatSprintWeb.ChannelCase
  alias NameThatSprintWeb.UserSocket

  describe "join/3 success" do
    test "ok when game exists and user name is not taken" do
      assert {:ok, _, socket} = socket(UserSocket, nil, %{})
      |> subscribe_and_join("lobby:default", %{})
      
      ref = push(socket, "new_game")
      assert_reply ref, :ok, %{room_code: room_code}

      assert {:ok, _, %Phoenix.Socket{}} = socket(UserSocket, nil, %{})
      |> subscribe_and_join("game:" <> room_code, %{user_name: "me"})
    end
    test "error when game does not exist" do
      assert {:error, %{reason: :game_not_found}} =
        socket(UserSocket, nil, %{})
        |> subscribe_and_join("game:123", %{user_name: "me"})
    end
    test "error when user name taken" do
      assert {:ok, _, socket} = socket(UserSocket, nil, %{})
      |> subscribe_and_join("lobby:default", %{})
      
      ref = push(socket, "new_game")
      assert_reply ref, :ok, %{room_code: room_code}

      assert {:ok, _, %Phoenix.Socket{}} = socket(UserSocket, nil, %{})
      |> subscribe_and_join("game:" <> room_code, %{user_name: "me"})

      assert {:error, %{reason: :name_in_use}} = socket(UserSocket, nil, %{})
      |> subscribe_and_join("game:" <> room_code, %{user_name: "me"})
    end
  end
end
