import { ConversationCard } from "@/components/conversations/conversation-card";
import { List } from "@/components/list";

const conversations = [
    {
        id: 1,
        creatorId: 1,
        recipientId: 2,
        createdAt: "2024-10-19T12:00:00.000Z",
        updatedAt: "2024-10-19T12:10:00.000Z",
        users: [],
        messages: [],
    },
    {
        id: 2,
        creatorId: 3,
        recipientId: 4,
        createdAt: "2024-10-19T13:00:00.000Z",
        updatedAt: "2024-10-19T13:15:00.000Z",
        users: [],
        messages: [],
    },
    {
        id: 3,
        creatorId: 5,
        recipientId: 6,
        createdAt: "2024-10-19T14:00:00.000Z",
        updatedAt: "2024-10-19T14:20:00.000Z",
        users: [],
        messages: [],
    },
    {
        id: 4,
        creatorId: 2,
        recipientId: 3,
        createdAt: "2024-10-19T15:00:00.000Z",
        updatedAt: "2024-10-19T15:05:00.000Z",
        users: [],
        messages: [],
    },
    {
        id: 5,
        creatorId: 4,
        recipientId: 1,
        createdAt: "2024-10-19T16:00:00.000Z",
        updatedAt: "2024-10-19T16:10:00.000Z",
        users: [],
        messages: [],
    },
];

export default function HomePage() {
    return (
        <div className="flex w-full">
            <div className="min-h-screen flex flex-col justify-between">
                <List
                    renderItem={(item) => <ConversationCard conversation={item} />}
                    keyExtractor={(item) => item?.id}
                    items={conversations}
                    className={"border h-full w-[300px] flex flex-col"}
                />
                <div>
                  Settings
                </div>
            </div>

            <div className="p-2">Chat Page</div>
        </div>
    );
}
