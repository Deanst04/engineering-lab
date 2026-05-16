export interface AuthUser {
    userId: string;
    role: "USER" | "ADMIN";
}

declare global {
    namespace Express {
        interface Request {
            authUser?: AuthUser;
        }
    }
}