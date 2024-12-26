export enum UserRole {
    CLIENT = "CLIENT",
    OFFICER = "OFFICER",
}

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    password: string;
};
