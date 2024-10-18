"use server";

import { APIResponse, AuthResponse } from "@/types";
import { cookies } from "next/headers";

export const register = async (data: Record<string, string>): Promise<APIResponse<AuthResponse> | null> => {
    try {
        const response = await fetch(process.env.BASE_API + "auth/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });
        const responseData: APIResponse<AuthResponse> = await response.json();
        if (response.status) {
            cookies().set("token", responseData.data.accessToken, {
                maxAge: 60 * 60 * 5,
                secure: true,
                httpOnly: true,
            });
        }
        return responseData;
    } catch (error) {
        return null;
    }
};

export const loginWithPassword = async (data: Record<string, string>): Promise<APIResponse<AuthResponse> | null> => {
    try {
        const response = await fetch(process.env.BASE_API + "auth/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });
        const responseData: APIResponse<AuthResponse> = await response.json();

        if (responseData.status) {
            cookies().set("token", responseData.data.accessToken, {
                maxAge: 60 * 60 * 5,
                secure: true,
                httpOnly: true,
            });
        }
        return responseData;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const loginWithCode = async (data: Record<string, string>) => {
    console.log(data);
    try {
        const response = await fetch(process.env.BASE_API + "auth/code", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });
        const responseData = await response.json();
        if (responseData?.data.success) {
            cookies().set("email", data.email, { httpOnly: true, maxAge: 60 * 10 });
        }
        return responseData;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const verifyLoginCode = async (data: Record<string, string>): Promise<APIResponse<AuthResponse> | null> => {
    try {
        const response = await fetch(process.env.BASE_API + "auth/verifyCode", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });
        const responseData: APIResponse<AuthResponse> = await response.json();
        if (responseData?.data && responseData.data.verification?.verified) {
            cookies().set("token", responseData.data.accessToken, {
                maxAge: 60 * 60 * 5,
                secure: true,
                httpOnly: true,
            });
        }
        return responseData;
    } catch (error) {
        return null;
    }
};
