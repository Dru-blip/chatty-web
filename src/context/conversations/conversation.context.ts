import { Conversation } from "@/types";
import React, { createContext, SetStateAction } from "react";

interface ContextProps{
    conversations:Conversation[]
    updateConversations:React.Dispatch<SetStateAction<Conversation[]>>
}


const ConversationsContext=createContext<ContextProps>({} as ContextProps)

export default ConversationsContext