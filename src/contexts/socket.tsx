import { io, Socket } from "socket.io-client"
import React from 'react'
import { useAuth } from "./auth";
import { useToast } from "@chakra-ui/react";

export const SocketContext = React.createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket | null>(null)
  const { authState: { token } } = useAuth()
  const toast = useToast()

  React.useEffect(() => {
    if (!token) return
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL}?token=${token}`);

    socket.on("connect", () => {
      console.log(socket.id)
    })

    socket.on("disconnect", () => {
      console.log(socket.id)
    })

    socket.on("data", (msg) => {
      toast({
        title: msg.title,
        description: msg.description,
        status: msg.status,
      })
    })

    setSocket(socket)
  }, [token])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
