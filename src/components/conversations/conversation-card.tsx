"use client";

import { Conversation } from "@/types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "@/context/user/user.context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    conversation: Conversation;
}
export function ConversationCard({ conversation }: Props) {
    const { user } = useContext(UserContext);
    const reciever = conversation.creatorId === user.id ? conversation.recipient : conversation.creator;
    let avatarName = "";
    reciever.name.split(" ").forEach((val) => {
        avatarName += val.at(0)?.toUpperCase();
    });
    return (
        <Link href={`/chat/${reciever.id}`}>
            <Card className="overflow-hidden flex items-center gap-2 p-2">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{avatarName}</AvatarFallback>
                </Avatar>
                {reciever.name}
            </Card>
        </Link>
    );
}
