import { Exclude } from "class-transformer";

export interface User {
    id: number;
    name: string;
    surname: string;
    username: string;
    password: string;
}

export class SerializedUser {
    id: number;
    name: string;
    surname: string;
    username: string;
    @Exclude()
    password: string;

    constructor(partial: Partial<SerializedUser>) {
        Object.assign(this, partial);
    }
}