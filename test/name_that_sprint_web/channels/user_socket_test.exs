defmodule NameThatSprintWeb.UserSocketTest do
  use NameThatSprintWeb.ChannelCase
  alias NameThatSprintWeb.UserSocket

  describe "connect/3" do
    test "can connect without parameters" do
      assert {:ok, %Phoenix.Socket{}} = connect(UserSocket, %{})
    end
  end

  describe "id/1" do
    test "an identifier is not provided" do
      assert {:ok, socket} = connect(UserSocket, %{})
      assert UserSocket.id(socket) == nil
    end
  end
end
