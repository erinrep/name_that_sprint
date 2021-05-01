defmodule NameThatSprintWeb.LobbyChannel do
  use Phoenix.Channel
  alias NameThatSprint.GameSupervisor

  def join("lobby:default", _params, socket) do
    {:ok, socket}
  end

  def handle_in("new_game", _params, socket) do
    case new_game(socket) do
      {:ok, result} -> {:reply, {:ok, result}, socket}
      {:error, reason} -> {:reply, {:error, %{reason: reason}}, socket}
    end
  end

  defp new_game(socket) do
    room_code = [:positive]
      |> System.unique_integer()
      |> Integer.to_string()

    case GameSupervisor.start_game(room_code) do
      {:ok, _game} ->
        {:ok, %{room_code: room_code}}
      {:error, {:already_started, _pid}} ->
        {:error, "Game already started"}
      error -> error
    end
  end
end
