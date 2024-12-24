import { User, UserRole } from "../../models/user.model";

export const users: User[] = [
    {
        email: "officer1@gmail.com",
        name: "officer1",
        role: UserRole.OFFICER,
        password: "String@",
    },
    {
        email: "officer2@gmail.com",
        name: "officer2",
        role: UserRole.OFFICER,
        password: "String@",
    },
    {
        email: "client1@gmail.com",
        name: "client1",
        role: UserRole.CLIENT,
        password: "String@",
    },
    {
        email: "client1@gmail.com",
        name: "client2",
        role: UserRole.CLIENT,
        password: "String@",
    },
];

export function findUserByEmail(email: string): User | undefined {
    return users.find((user) => user.email === email);
}
