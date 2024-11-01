"use client"

import { User } from "@/types";
import UserContext from "./user.context";
import { useState } from "react";

interface Props {
    userDetails: User;
    children: React.ReactNode;
}

export function UserProvider({ children, userDetails }: Props) {
    const [user, setUser] = useState<User>(userDetails ?? {});
    return (
        <UserContext.Provider
            value={{ user, updateUser: setUser }}
        >
            {children}
        </UserContext.Provider>
    );
}
