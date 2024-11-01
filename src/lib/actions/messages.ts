"use server"

import { APIResponse, Message } from "@/types";
import { cookies } from "next/headers";


export const sendMessage=async (data:Record<string,string|number>):Promise<APIResponse<Message>|null>=>{
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(process.env.BASE_API + `${null}/messages`, {
            method:"POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({...data})
        });

        const responseData = await response.json();
        return responseData
    } catch (error) {
        return null;
    }
}