defmodule NameThatSprint.Game do 
  use GenServer, start: {__MODULE__, :start_link, []}, restart: :transient
  require Logger

  @timeout 60 * 60 * 24 * 1000

  def via_tuple(name), do: {:via, Registry, {Registry.Game, name}}

  def start_link(name) when is_binary(name), do:
    GenServer.start_link(__MODULE__, {name}, name: via_tuple(name))

  def init({name}) do
    send(self(), {:set_state, {name}})
    {:ok, %{name: name, ideas: []}}
  end

  def status(game) do
    GenServer.call(game, :status)
  end

  def add_idea(game, idea) do
    Logger.debug"> add_idea #{inspect idea}"
    GenServer.call(game, {:add_idea, idea})
  end

  def handle_call(:status, _from, state_data) do
    reply_success(state_data, {:ok, state_data})
  end

  def handle_info({:set_state, {name}}, _state_data) do
    state_data =
    case :ets.lookup(:game_state, name) do
      [] -> %{name: name, ideas: []}
      [{_key, state}] -> state
    end

    :ets.insert(:game_state, {name, state_data})
    {:noreply, state_data, @timeout}
  end

  def handle_call({:add_idea, idea}, _from, state_data) do
    state_data[:ideas]
    |> update_in(&(List.insert_at(&1, -1, idea)))
    |> reply_success(:ok)
  end

  defp reply_success(state_data, reply) do
    :ets.insert(:game_state, {state_data.name, state_data})
    {:reply, reply, state_data, @timeout}
  end
end