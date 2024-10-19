export interface APIResponse<T> {
    statusCode: number;
    status: boolean;
    path: string;
    message: string;
    data: T;
    timestamp: string;
}

export interface AuthResponse {
    accessToken: string;
    email: string;
    name: string;
    verification?: {
        verified: boolean;
        message: string;
        email: string;
    };
}

export interface User{
    id:number
    name:string
    email:string
    image?:string
    createdAt:Date
    updatedAt:Date
    conversations:Conversation[]
}

export interface Conversation{
    id:number
    creatorId:number
    recipientId:number
    createdAt:string
    updatedAt:string
    users:User[]
    messages:Message[]
}

export interface Message{
    id:number
    text:string
    createdAt:Date
    updatedAt:Date
    senderId:number
    recieverId:number
    conversationId:number
    sender:User
    reciever:User
    conversation:Conversation
}