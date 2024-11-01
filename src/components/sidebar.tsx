"use client";

import { LogOutIcon, MessageCircleCode, SearchIcon, SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import Link from "next/link";
import { ConversationList } from "./conversations/conversation-list";
import { UserSearch } from "./user-search/user-search";
import { LogoutButton } from "./auth/logout-button";
import UserContext from "@/context/user/user.context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export function Sidebar() {
    const pathname = usePathname();
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const { user } = useContext(UserContext);
    return (
        <div className="flex flex-col w-80 border-r">
            <div className="flex items-center gap-2 w-full border-b p-4">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
            </div>
            
                <Tabs defaultValue="conversations" className="min-h-screen">
                    <TabsList className="w-full rounded-none h-[50px]">
                        <TabsTrigger value="conversations" className="w-full h-full"><ChatBubbleIcon className="mr-2 w-4 h-4"/> Conversations</TabsTrigger>
                        <TabsTrigger value="search" className="w-full h-full"><SearchIcon className="mr-2 w-4 h-4"/> Search</TabsTrigger>
                    </TabsList>
                    <TabsContent value="conversations" className="overflow-hidden">
                        <ConversationList/>
                    </TabsContent>
                    <TabsContent value="search" className="overflow-hidden">
                        <UserSearch/>
                    </TabsContent>
                </Tabs>
           
            {/* <div className="flex flex-col p-2 gap-2 justify-between">
                <div className="flex flex-col gap-2">
                    <Link href={"/"} onClick={()=>{
                        setShowSearch(false)
                    }}>
                        <Button variant={pathname.includes("/chat") || pathname === "/" ? "default" : "outline"}>
                            <MessageCircleCode />
                        </Button>
                    </Link>

                    <Button variant={"outline"} onClick={()=>{
                        setShowSearch(true)
                    }}>
                        <SearchIcon />
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <Button variant={"outline"}>
                        <SettingsIcon />
                    </Button>
                    <LogoutButton/>
                </div>
            </div> */}
            {/* {showSearch ? <UserSearch /> : <ConversationList />} */}
        </div>
    );
}
