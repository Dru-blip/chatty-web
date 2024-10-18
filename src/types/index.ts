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
