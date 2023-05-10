import React, { createContext, useEffect, useState } from "react"
import { Socket as PhxSocket } from "phoenix"

export const SocketContext = createContext(null)

const Socket = ({ children }) => {
  const [socket, setSocket] = useState(null)

  const setupSocket = () => {
    if (!socket) {
      const newSocket = new PhxSocket("/socket")
      newSocket.connect()
      setSocket(newSocket)
    }
  }

  const teardownSocket = () => {
    if (socket) {
      socket.disconnect()
      setSocket(null)
    }
  }

  useEffect(() => {
    setupSocket()
    return teardownSocket
  }, [socket])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export default Socket
