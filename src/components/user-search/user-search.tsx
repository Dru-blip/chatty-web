"use client";

import { UserActions } from "@/lib/actions";
import { debounce } from "@/lib/utils";
import { User } from "@/types";
import { useState } from "react";
import { List } from "../list";
import { Input } from "../ui/input";
import { UserDetailsCard } from "./user-card";

export function UserSearch() {
    const [searchResults, setSearchResults] = useState<User[]>();
    const handleSearch = debounce(async (e) => {
        const response = await UserActions.searchUser(e.target.value);
        setSearchResults(response.data);
    }, 1000);
    return (
        <div className="p-2 border flex flex-col gap-2">
            <Input placeholder="enter username" onChange={handleSearch} />
            <List
                items={searchResults!}
                keyExtractor={(user) => user.id}
                renderItem={(user) => <UserDetailsCard user={user}/>}
                className="flex flex-col"
            />
        </div>
    );
}
