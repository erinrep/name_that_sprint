defmodule NameThatSprintWeb.GameChannel do
  use Phoenix.Channel
  require Logger

  alias NameThatSprint.{Presence, Game, GameSupervisor, NameGenerator}

  def join("game:" <> room_code, %{"user_name" => user_name}, socket) do
    Logger.debug("> join #{inspect(room_code)}")
    socket
    |> assign_player(user_name)
    |> check_that_game_exists(room_code)
    |> game_status()
  end

  def handle_info(:after_join, socket) do
    {:ok, _} =
      Presence.track(socket, socket.assigns.user, %{
        online_at: inspect(System.system_time(:seconds))
      })

    users =
      socket
      |> Presence.list()
      |> Map.keys()

    broadcast!(socket, "player_joined", %{users: users})
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    users =
      socket
      |> Presence.list()
      |> Map.keys()
      |> Enum.filter(&(&1 != socket.assigns.user))

    broadcast!(socket, "player_left", %{users: users})
  end

  def handle_in("idea", %{"name" => name}, socket) do
    case Game.add_idea(via(socket.topic), name) do
      {:ok, idea} ->
        broadcast!(socket, "idea_received", idea)
        {:reply, {:ok, idea}, socket}
      {:error, reason} -> {:reply, {:error, %{reason: reason}}, socket}
    end
  end

  def handle_in("set_voting_mode", %{"status" => status}, socket) do
    {:ok, mode_status} = Game.set_voting_mode(via(socket.topic), status)
    broadcast!(socket, "voting_mode_updated", %{status: mode_status})
    {:reply, :ok, socket}
  end

  def handle_in("add_vote", %{"user" => user, "vote" => vote}, socket) do
    case Game.add_vote(via(socket.topic), vote, user) do
      {:ok, item} -> 
        broadcast!(socket, "vote_updated", item)
        {:reply, :ok, socket}
      {:error, reason} -> {:reply, {:error, %{reason: reason}}, socket}
    end
  end

  def handle_in("remove_vote", %{"user" => user, "vote" => vote}, socket) do
    case Game.remove_vote(via(socket.topic), vote, user) do
      {:ok, item} -> 
        broadcast!(socket, "vote_updated", item)
        {:reply, :ok, socket}
      {:error, reason} -> {:reply, {:error, %{reason: reason}}, socket}
    end
  end

  def handle_in("get_suggestion", _params, socket) do
    {:reply, {:ok, %{suggestion: NameGenerator.create()}}, socket}
  end

  defp assign_player(socket, user_name) do
    player_exists? =
      socket
      |> Presence.list()
      |> Map.has_key?(user_name)

    case player_exists? do
      false ->
        send(self, :after_join)
        assign(socket, :user, user_name)
      true -> {:error, %{reason: :name_in_use}}
    end
  end

  defp check_that_game_exists({:error, reason}, _room_code), do: {:error, reason}
  defp check_that_game_exists(socket, room_code) do
    case GameSupervisor.pid_from_name(room_code) do
      nil -> {:error, %{reason: :game_not_found}}
      _pid -> socket
    end
  end

  defp game_status({:error, reason}), do: {:error, reason}
  defp game_status(socket) do
    {:ok, status} = Game.status(via(socket.topic))
    {:ok, status, socket}
  end

  defp via("game:" <> name), do: Game.via_tuple(name)
end
