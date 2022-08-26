defmodule NameThatSprint.Game do
  use GenServer, start: {__MODULE__, :start_link, []}, restart: :transient

  @timeout 60 * 60 * 24 * 1000
  @max_votes 3

  def via_tuple(name), do: {:via, Registry, {Registry.Game, name}}

  def start_link(name) when is_binary(name),
    do: GenServer.start_link(__MODULE__, {name}, name: via_tuple(name))

  def init({name}) do
    send(self(), {:set_state, {name}})
    {:ok, %{name: name, ideas: [], leader: nil}}
  end

  def terminate(:shutdown, name) do
    :ets.delete(:game_state, name)
    :ok
  end
  def terminate(_reason, _name), do: :ok

  def status(game) do
    GenServer.call(game, :status)
  end

  def set_leader(game, name) do
    GenServer.call(game, {:set_leader, name})
  end

  def add_idea(game, name) do
    GenServer.call(game, {:add_idea, name})
  end

  def set_voting_mode(game, mode_status) do
    GenServer.call(game, {:set_voting_mode, mode_status})
  end

  def add_vote(game, idea, user) do
    GenServer.call(game, {:add_vote, idea, user})
  end

  def remove_vote(game, idea, user) do
    GenServer.call(game, {:remove_vote, idea, user})
  end

  def declare_winner(game) do
    GenServer.call(game, :declare_winner)
  end

  def handle_call(:status, _from, state_data) do
    reply_success(state_data, {:ok, state_data})
  end

  def handle_call({:set_leader, name}, _from, state_data) do
    state_data
    |> Map.put(:leader, name)
    |> reply_success({:ok, name})
  end

  def handle_call({:add_idea, name}, _from, state_data) do
    existing_idea = state_data
    |> Map.get(:ideas)
    |> Enum.find(&(&1.name == name))

    case existing_idea do
      nil ->
        idea = %{name: name, votes: []}
        state_data[:ideas]
        |> update_in(&(List.insert_at(&1, -1, idea)))
        |> reply_success({:ok, idea})
      _idea -> {:reply, {:error, :duplicate_name}, state_data, @timeout}
    end
  end

  def handle_call({:set_voting_mode, mode_status}, _from, state_data) do
    state_data
    |> Map.put(:voting_mode, mode_status)
    |> reply_success({:ok, mode_status})
  end

  def handle_call({:add_vote, name, user}, _from, state_data) do
    state_data
    |> get_idea(name)
    |> check_if_votes_left(user, state_data.vote_tracking[user])
    |> update_votes(1)
  end

  def handle_call({:remove_vote, name, user}, _from, state_data) do
    state_data
    |> get_idea(name)
    |> check_if_vote_exists(user)
    |> update_votes(-1)
  end

  def handle_call(:declare_winner, _from, state_data) do
    case state_data
    |> Map.get(:ideas)
    |> Enum.map(&({&1.name, Enum.count(&1.votes)}))
    |> Enum.sort(fn {_name1, num_votes1}, {_name2, num_votes2} -> 
      num_votes1 > num_votes2
    end)
    |> Enum.at(0) do
      nil -> {:reply, {:error, :no_ideas}, state_data, @timeout}
      {winner, _votes} ->
        state_data = Map.put(state_data, :winner, winner)
        reply_success(state_data, {:ok, winner}) 
    end
  end

  def handle_info({:set_state, {name}}, _state_data) do
    state_data =
      case :ets.lookup(:game_state, name) do
        [] -> %{name: name, ideas: [], voting_mode: false, vote_tracking: %{}, winner: nil, leader: nil}
        [{_key, state}] -> state
      end

    :ets.insert(:game_state, {name, state_data})
    {:noreply, state_data, @timeout}
  end

  def handle_info(:timeout, state_data) do
    {:stop, {:shutdown, :timeout}, state_data}
  end

  defp get_idea(state_data, name) do
    case state_data
      |> Map.get(:ideas)
      |> Enum.with_index()
      |> Enum.find(fn {idea, _index} -> idea.name == name end) do
        nil -> {:error, :idea_not_found, state_data}
        idea -> {:ok, state_data, idea}
    end
  end

  defp check_if_votes_left({:error, reason, state_data}, _user, _num_votes), do: {:error, reason, state_data}
  defp check_if_votes_left({:ok, state_data, idea}, user, nil), do: {:ok, state_data, idea, user}
  defp check_if_votes_left({:ok, state_data, idea}, user, num_votes) when num_votes < @max_votes do
    {:ok, state_data, idea, user}
  end
  defp check_if_votes_left({:ok, state_data, _idea}, _user, _num_votes), do: {:error, :no_votes_left, state_data}

  defp check_if_vote_exists({:error, reason, state_data}, _user), do: {:error, reason, state_data}
  defp check_if_vote_exists({:ok, state_data, {idea, index}}, user) do
    case idea
    |> Map.get(:votes)
    |> Enum.find(&(&1 == user)) do
      nil -> {:error, :vote_not_found, state_data}
      _name -> {:ok, state_data, {idea, index}, user}
    end
  end

  defp update_votes({:error, reason, state_data}, _modifier), do: {:reply, {:error, reason}, state_data, @timeout}
  defp update_votes({:ok, state_data, {idea, index}, user}, modifier) do
    idea = update_in(idea[:votes], fn votes ->
      case modifier do
        1 -> List.insert_at(votes, -1, user)
        -1 -> List.delete(votes, user)
      end
    end)

    state_data
    |> update_in([:ideas], &(List.replace_at(&1, index, idea)))
    |> update_in([:vote_tracking], fn tracking -> 
      tracking
      |> Map.get_and_update(user, &(increment_or_one(&1, modifier)))
      |> Tuple.to_list()
      |> Enum.at(1)
    end)
    |> reply_success({:ok, idea})
  end

  defp increment_or_one(nil, _modifier), do: {nil, 1}
  defp increment_or_one(x, modifier), do: {x, x + modifier}

  defp reply_success(state_data, reply) do
    :ets.insert(:game_state, {state_data.name, state_data})
    {:reply, reply, state_data, @timeout}
  end
end
