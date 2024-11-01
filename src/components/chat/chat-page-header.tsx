"use client";

import MessagesContext from "@/context/messages/messages.context";
import { ConversationActions } from "@/lib/actions";
import { User } from "@/types";
import { Loader2Icon, Rotate3D, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import ConversationsContext from "@/context/conversations/conversation.context";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { capitalize } from "@/lib/utils";

interface Props {
    reciever: User;
}

export function ChatPageHeader({ reciever }: Props) {
    const { conversation } = useContext(MessagesContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { conversations, updateConversations } = useContext(ConversationsContext);
    const router = useRouter();
    let avatarName = capitalize(Object.keys(conversation).length !== 0 ? conversation.recipient.name : reciever.name);

    return (
        <div className="bg-accent p-4 flex items-center">
            <div className="flex items-center w-full gap-2">
                <Avatar >
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-black text-white">{avatarName}</AvatarFallback>
                </Avatar>
                {Object.keys(conversation).length !== 0 ? (
                    <div>{conversation.recipient?.name}</div>
                ) : (
                    <div>{reciever.name}</div>
                )}
                {/* <div>
                    <p>creator :{conversation.creator.name}</p>
                    <p>recipient :{conversation.recipient.name}</p>
                </div> */}
                {/* <div>
                    <p>creator Status : {conversation.creator.onlineStatus ? "Online" : "Offline"}</p>
                    <p>recipient Status : {conversation.recipient.onlineStatus ? "Online" : "Offline"}</p>
                </div> */}
            </div>

            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete conversation, this action cannot be undone
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-destructive"
                                onClick={async () => {
                                    setIsLoading(true);
                                    const response = await ConversationActions.deleteConversation(conversation.id);
                                    if (response && response.status === true) {
                                        const filteredConversations = conversations.filter((value) => {
                                            if (value.id !== response.data.id) {
                                                return value;
                                            }
                                        });
                                        updateConversations([...filteredConversations]);
                                        router.push("/");
                                    }
                                    setIsLoading(false);
                                }}
                            >
                                {isLoading ? (
                                    <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="mr-2 w-4 h-4" />
                                )}
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
