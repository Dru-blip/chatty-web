"use client";

import { io } from "socket.io-client";
import SocketContext from "./socket.context";

interface Props {
    children: React.ReactNode;
    token:string
}

export function SocketProvider({ children,token }: Props) {
    return (
        <SocketContext.Provider value={io("http://localhost:5000/",{auth:{
            token
        }})}>
            {children}
        </SocketContext.Provider>
    );
}
