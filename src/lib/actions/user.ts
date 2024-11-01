"use server";

import { cookies } from "next/headers";

export const searchUser = async (name: string) => {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(process.env.BASE_API + `users?name=${name}`, {
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
};
