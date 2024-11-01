
import { Conversation, Message } from "@/types";
import React, { createContext, SetStateAction } from "react";

interface ContextProps{
    messages:Message[]
    conversation:Conversation
    updateConversation:React.Dispatch<SetStateAction<Conversation>>
    updateMessages:React.Dispatch<SetStateAction<Message[]>>
}


const MessagesContext=createContext<ContextProps>({} as ContextProps)

export default MessagesContext