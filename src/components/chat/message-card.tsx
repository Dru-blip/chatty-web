import { Message } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { ArrowDownIcon, ChevronDown } from "lucide-react";

interface Props {
    message: Message;
    className: string;
}

export function MessageCard({ message, className }: Props) {
    return (
        <Card className={`group  flex  flex-col p-2 ${className}`}>
            <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute -top-2 -right-2 -translate-y-1/2 hidden w-full flex justify-end group-hover:flex"
            >
                <ChevronDown className="w-5 h-5" />
            </Button>

            <div>
                <p className="text-md">{message.text}</p>
            </div>
            <div className="text-xs text-right">{format(message.createdAt, "p")}</div>
        </Card>
    );
}
