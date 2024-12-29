import { User, UserRole } from "../../models/user.model";

export const users: User[] = [
    {
        id: "1",
        email: "officer1@gmail.com",
        name: "officer1",
        role: UserRole.OFFICER,
        password: "123123123a!2",
    },
    {
        id: "2",
        email: "officer2@gmail.com",
        name: "officer2",
        role: UserRole.OFFICER,
        password: "123123123a!2",
    },
    {
        id: "3",
        email: "client1@gmail.com",
        name: "client1",
        role: UserRole.CLIENT,
        password: "123123123a!2",
    },
    {
        id: "4",
        email: "client1@gmail.com",
        name: "client2",
        role: UserRole.CLIENT,
        password: "123123123a!2",
    },
];

export function findUserByEmail(email: string): User | undefined {
    return users.find((user) => user.email === email);
}
