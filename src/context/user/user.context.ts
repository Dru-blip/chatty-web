import { Conversation, User } from "@/types";
import React, { createContext, SetStateAction } from "react";

interface ContextProps{
    user:User
    updateUser:React.Dispatch<SetStateAction<User>>
}


const UserContext=createContext<ContextProps>({} as ContextProps)

export default UserContext