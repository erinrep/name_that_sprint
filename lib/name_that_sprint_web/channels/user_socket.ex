defmodule NameThatSprintWeb.UserSocket do
  use Phoenix.Socket

  channel "game:*", NameThatSprintWeb.GameChannel
  channel "lobby:default", NameThatSprintWeb.LobbyChannel

  def connect(_params, socket, _connect_info) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
