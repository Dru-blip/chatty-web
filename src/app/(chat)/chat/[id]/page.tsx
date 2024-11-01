import { MessageInputPanel } from "@/components/chat/chat-message-input-panel";
import { ChatPageHeader } from "@/components/chat/chat-page-header";
import { MessageList } from "@/components/chat/messages-list";
import { MessagesProvider } from "@/context/messages/messages-provider";
import { APIResponse, Conversation, Message, User } from "@/types";
import { cookies } from "next/headers";

const fetchMessages = async (id: string) => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `${Number(id)}/messages`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        const responseData: APIResponse<Message[]> = await response.json();

        if (responseData.status) {
            return responseData.data;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

const fetchConversation = async (id: string) => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `conversations?with=${id}`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        const responseData: APIResponse<{ conversation: Conversation; reciever: User }> = await response.json();
        if (responseData.status) {
            return responseData.data;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default async function ChatPage({ params }: { params: { id: string } }) {
    const response = await fetchConversation(params.id);
    return (
        <MessagesProvider conversationDetails={response?.conversation!} messages={response?.conversation?.messages!}>
            <div className="flex flex-col w-full">
                <div>
                    <ChatPageHeader reciever={response?.reciever!}/>
                </div>
                <MessageList />
                <MessageInputPanel conversation={response?.conversation!} recieverId={params.id} />
            </div>
        </MessagesProvider>
    );
}
