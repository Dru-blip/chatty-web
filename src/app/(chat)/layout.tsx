import type { Metadata } from "next";

import { Sidebar } from "@/components/sidebar";
import { cookies, headers } from "next/headers";
import { APIResponse, Conversation, User } from "@/types";
import { ConversationsProvider } from "@/context/conversations/conversation-provider";
import { UserProvider } from "@/context/user/user-provider";
import { SocketProvider } from "@/context/socket/socket-provider";
// import "./globals.css";

export const metadata: Metadata = {
    title: "Chatty",
    description: "",
};

const fetchUser = async (): Promise<User | null> => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + `users/id`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        const responseData: APIResponse<User> = await response.json();
        if (responseData.status) {
            return responseData.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const fetchConversations = async (): Promise<Conversation[] | []> => {
    const token = cookies().get("token")!;
    try {
        const response = await fetch(process.env.BASE_API + "conversations/all", {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        const responseData: APIResponse<Conversation[]> = await response.json();
        if (responseData.status) {
            return responseData.data;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default async function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const token=cookies().get("token")!
    const conversations = await fetchConversations();
    const user = await fetchUser();
    return (
        <SocketProvider token={token.value}>
            <UserProvider userDetails={user!}>
                <ConversationsProvider conversations={conversations}>
                    <div className="max-h-screen flex">
                        <Sidebar />
                        <section className="flex w-full">{children}</section>
                    </div>
                </ConversationsProvider>
            </UserProvider>
        </SocketProvider>
    );
}
