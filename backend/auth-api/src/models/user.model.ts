export default interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    passwordHash: string;
    role: "admin" | "user";
    createdAt: Date;
    updatedAt: Date;
}