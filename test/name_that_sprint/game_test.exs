defmodule NameThatSprint.GameTest do
  use ExUnit.Case
  alias NameThatSprint.Game

  describe "Game" do
    test "status/1" do
      {:ok, game} = Game.start_link("my_game")
      {:ok, status} = Game.status(game)

      assert status.name == "my_game"
      assert status.ideas == []
      assert status.voting_mode == false
      assert status.vote_tracking == %{}

      Game.terminate(:shutdown, "my_game")
    end

    test "add_idea/2 success" do
      {:ok, game} = Game.start_link("my_game")
      {:ok, _idea} = Game.add_idea(game, "fun idea")
      {:ok, status} = Game.status(game)

      assert status.ideas == [%{name: "fun idea", votes: []}]

      Game.terminate(:shutdown, "my_game")
    end

    test "add_idea/2 error :duplicate_name" do
      {:ok, game} = Game.start_link("my_game")
      {:ok, _idea} = Game.add_idea(game, "fun idea")
      {:error, reason} = Game.add_idea(game, "fun idea")

      assert reason == :duplicate_name

      Game.terminate(:shutdown, "my_game")
    end

    test "set_voting_mode/2 success" do
      {:ok, game} = Game.start_link("my_game")
      {:ok, _mode} = Game.set_voting_mode(game, true)
      {:ok, status} = Game.status(game)

      assert status.voting_mode == true

      Game.terminate(:shutdown, "my_game")
    end

    test "add_vote/3 success" do
      {:ok, game} = Game.start_link("my_game")
      {:ok, _idea} = Game.add_idea(game, "fun idea")
      {:ok, idea} = Game.add_vote(game, "fun idea", "veronica")
      {:ok, status} = Game.status(game)

      assert idea == %{name: "fun idea", votes: ["veronica"]}
      assert status.ideas == [%{name: "fun idea", votes: ["veronica"]}]

      {:ok, idea} = Game.add_vote(game, "fun idea", "wallace")
      {:ok, status} = Game.status(game)

      assert idea == %{name: "fun idea", votes: ["veronica", "wallace"]}
      assert status.ideas == [%{name: "fun idea", votes: ["veronica", "wallace"]}]

      Game.terminate(:shutdown, "my_game")
    end

    test "add_vote/3 error :idea_not_found" do
      {:ok, game} = Game.start_link("my_game")
      {:error, reason} = Game.add_vote(game, "fun idea", "veronica")

      assert reason == :idea_not_found

      Game.terminate(:shutdown, "my_game")
    end

    test "add_vote/3 error :no_votes_left" do
      {:ok, game} = Game.start_link("my_game")
      {:ok, _idea} = Game.add_idea(game, "fun idea")
      {:ok, _idea} = Game.add_vote(game, "fun idea", "veronica")
      {:ok, _idea} = Game.add_vote(game, "fun idea", "veronica")
      {:ok, _idea} = Game.add_vote(game, "fun idea", "veronica")
      {:error, reason} = Game.add_vote(game, "fun idea", "veronica")

      assert reason == :no_votes_left

      Game.terminate(:shutdown, "my_game")
    end

    test "remove_vote/3 success" do
      {:ok, game} = Game.start_link("my_game")
      {:ok, _idea} = Game.add_idea(game, "fun idea")
      {:ok, _idea} = Game.add_vote(game, "fun idea", "veronica")
      {:ok, idea} = Game.remove_vote(game, "fun idea", "veronica")
      {:ok, status} = Game.status(game)

      assert idea == %{name: "fun idea", votes: []}
      assert status.ideas == [%{name: "fun idea", votes: []}]

      Game.terminate(:shutdown, "my_game")
    end

    test "remove_vote/3 error :idea_not_found" do
      {:ok, game} = Game.start_link("my_game")
      {:error, reason} = Game.remove_vote(game, "fun idea", "veronica")

      assert reason == :idea_not_found

      Game.terminate(:shutdown, "my_game")
    end

    test "remove_vote/3 error :vote_not_found" do
      {:ok, game} = Game.start_link("my_game")
      {:ok, _idea} = Game.add_idea(game, "fun idea")
      {:error, reason} = Game.remove_vote(game, "fun idea", "veronica")

      assert reason == :vote_not_found

      Game.terminate(:shutdown, "my_game")
    end
  end
end
