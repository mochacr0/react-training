export enum UserRole {
    CLIENT = "CLIENT",
    OFFICER = "OFFICER",
}

export type User = {
    name: string;
    email: string;
    role: UserRole;
    password: string;
};
