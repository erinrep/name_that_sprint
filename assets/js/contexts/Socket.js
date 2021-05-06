import React, { createContext, useEffect, useState } from "react"
import { Socket as PhxSocket } from "phoenix"

export const SocketContext = createContext(null) 

export default function Socket({ children }) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setupSocket(socket, setSocket) 

    return () => teardownSocket(socket, setSocket) 
  }, [socket])

  return ( 
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

function setupSocket(socket, setSocket) {
  if (!socket) {
    console.debug("WebSocket routes mounted, connect Socket")
    const newSocket = new PhxSocket("/socket")
    newSocket.connect()
    setSocket(newSocket)
  }
}

function teardownSocket(socket, setSocket) {
  if (socket) {
    console.debug("WebSocket routes unmounted disconnect Socket", socket)
    socket.disconnect()
    setSocket(null)
  }
}
