"use client";

import MessagesContext from "@/context/messages/messages.context";
import UserContext from "@/context/user/user.context";
import { useContext, useEffect, useRef } from "react";
import { List } from "../list";
import { ScrollArea } from "../ui/scroll-area";
import { MessageCard } from "./message-card";

export function MessageList() {
    const { user } = useContext(UserContext);
    const { messages } = useContext(MessagesContext);
    
    const ref = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        ref.current?.scrollIntoView(false);
    };
    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <ScrollArea className="h-full">
            <div ref={ref}>
                <List
                    items={messages}
                    keyExtractor={(message) => message.id}
                    className="flex flex-col gap-2 p-2"
                    renderItem={(message) => {
                        if (message.senderId === user.id) {
                            return (
                                <div className="flex justify-end w-full">
                                    <MessageCard className="border-black" message={message} />
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex justify-start">
                                    <MessageCard className="" message={message} />
                                </div>
                            );
                        }
                    }}
                />
            </div>
        </ScrollArea>
    );
}
