
import { Conversation, Message } from "@/types";
import React, { createContext, SetStateAction } from "react";

import {io, Socket} from "socket.io-client"

const SocketContext=createContext<Socket|undefined>(undefined)

export default SocketContext