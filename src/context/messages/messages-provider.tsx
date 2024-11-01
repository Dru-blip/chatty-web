"use client";

import { Conversation, Message } from "@/types";
import MessagesContext from "./messages.context";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../socket/socket.context";

interface Props {
    conversationDetails: Conversation;
    children: React.ReactNode;
    messages: Message[];
}

export function MessagesProvider({ children, messages, conversationDetails }: Props) {
    const [messagesList, setMessageList] = useState<Message[]>(messages ?? []);
    const [conversation, updateConversation] = useState<Conversation>(conversationDetails ?? {});
    const socket = useContext(SocketContext);

    useEffect(() => {
        if (conversationDetails) {
            socket?.emit("conversationJoin", { id: conversationDetails.id });
        }
    }, []);

    return (
        <MessagesContext.Provider
            value={{ conversation, messages: messagesList, updateMessages: setMessageList, updateConversation }}
        >
            {children}
        </MessagesContext.Provider>
    );
}
