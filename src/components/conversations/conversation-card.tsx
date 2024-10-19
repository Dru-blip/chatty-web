import { Conversation } from "@/types"
import { Card, CardHeader, CardTitle } from "../ui/card"


interface Props{
    conversation:Conversation
}
export function ConversationCard({conversation}:Props) {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>{conversation.id}</CardTitle>
            </CardHeader>
        </Card>
    )
}