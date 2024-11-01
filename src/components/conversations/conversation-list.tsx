import { cookies } from "next/headers";
import { List } from "../list";
import { ConversationCard } from "./conversation-card";
import { APIResponse, Conversation } from "@/types";
import { useContext } from "react";
import ConversationsContext from "@/context/conversations/conversation.context";


export function ConversationList() {
    const {conversations}=useContext(ConversationsContext)
    return (
        <div className=" max-h-screen flex flex-col justify-between">
            <List
                renderItem={(item) => <ConversationCard conversation={item} />}
                keyExtractor={(item) => item?.id}
                items={conversations}
                className={"p-2 gap-2  flex flex-col"}
            />
        </div>
    );
}
