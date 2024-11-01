"use client"

import { Conversation } from "@/types";
import ConversationsContext from "./conversation.context";
import { useState } from "react";

interface Props {
    conversations: Conversation[];
    children: React.ReactNode;
}

export function ConversationsProvider({ children, conversations }: Props) {
    // console.log(conversations)
    const [conversationList, setConversationList] = useState<Conversation[]>(conversations ?? []);
    return (
        <ConversationsContext.Provider
            value={{ conversations: conversationList, updateConversations: setConversationList }}
        >
            {children}
        </ConversationsContext.Provider>
    );
}
