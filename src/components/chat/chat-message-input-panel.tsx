"use client";

import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useContext, useEffect, useState } from "react";
import { MessageActions } from "@/lib/actions";
import { Conversation } from "@/types";
import UserContext from "@/context/user/user.context";
import MessagesContext from "@/context/messages/messages.context";
import SocketContext from "@/context/socket/socket.context";

interface Props {
    conversation: Conversation;
    recieverId: string;
}

export function MessageInputPanel({ conversation, recieverId }: Props) {
    const [text, setText] = useState<string>();
    const { user } = useContext(UserContext);
    const { messages, updateMessages } = useContext(MessagesContext);
    const socket = useContext(SocketContext);
    // const recieverId=conversation.creatorId===user.id?conversation.recipient.id:conversation.creator.id

    useEffect(() => {
        socket?.on("messageSent", (data) => {
            updateMessages([...messages,data.message])
        });
    }, []);

    return (
        <div className="flex items-center w-full p-2 gap-2">
            <Input
                placeholder="Type your message"
                className="w-full"
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
            <Button
                onClick={async () => {
                    // console.log({ recieverId, text: text! });
                    const response = await MessageActions.sendMessage({
                        socketId: socket?.id!,
                        recieverId: Number(recieverId),
                        text: text!,
                    });
                    if (response?.status) {
                        messages.push(response.data);
                        updateMessages([...messages]);
                    }
                }}
            >
                <SendIcon />
            </Button>
        </div>
    );
}
