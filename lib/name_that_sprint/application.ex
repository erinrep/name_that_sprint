defmodule NameThatSprint.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      {Phoenix.PubSub, [name: NameThatSprint.PubSub, adapter: Phoenix.PubSub.PG2]},
      NameThatSprint.Presence,
      # Start the Endpoint (http/https)
      NameThatSprintWeb.Endpoint,
      {Registry, keys: :unique, name: Registry.Game},
      NameThatSprint.GameSupervisor
      # Starts a worker by calling: NameThatSprint.Worker.start_link(arg)
      # {NameThatSprint.Worker, arg},
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    :ets.new(:game_state, [:public, :named_table])
    opts = [strategy: :one_for_one, name: NameThatSprint.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    NameThatSprintWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
