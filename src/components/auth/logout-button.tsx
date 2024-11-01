"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { AuthActions } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router=useRouter()
    return (
        <Button variant={"outline"} onClick={()=>{
            AuthActions.logout()
            router.push("/login")
        }}>
            <LogOutIcon />
        </Button>
    );
}
