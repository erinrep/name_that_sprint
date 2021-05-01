defmodule NameThatSprint.Presence do
  use Phoenix.Presence,
    otp_app: :name_that_sprint,
    pubsub_server: NameThatSprint.PubSub
end
