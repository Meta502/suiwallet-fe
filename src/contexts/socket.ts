import { io } from "socket.io-client"
import React from 'react'

export const socket = io(`${process.env.NEXT_PUBLIC_BASE_API_URL}/socket/`);
export const SocketContext = React.createContext(socket);