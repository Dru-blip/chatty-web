"use server"


import { APIResponse, Conversation, Message } from "@/types";
import { cookies } from "next/headers";


export const deleteConversation=async (conversationId:number):Promise<APIResponse<Conversation>|null>=>{
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(process.env.BASE_API + `conversations/${conversationId}`, {
            method:"DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const responseData = await response.json();
        return responseData
    } catch (error) {
        return null;
    }
}