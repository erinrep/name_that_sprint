defmodule NameThatSprintWeb.PageController do
  use NameThatSprintWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
