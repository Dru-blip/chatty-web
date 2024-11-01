import { User } from "@/types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

interface Props {
    user: User;
}

export function UserDetailsCard({ user }: Props) {
    return (
        <Link href={`/chat/${user.id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    );
}
