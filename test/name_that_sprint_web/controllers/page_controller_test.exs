defmodule NameThatSprintWeb.PageControllerTest do
  use NameThatSprintWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Name That Sprint"
  end
end
