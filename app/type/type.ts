import {TArray} from "ts-interface-checker";

export interface DataType {
    id: string;
    level: number;
    type: string;
    name: string;
    avatarUrl?: string;
    dob?: Date | string;
    dod?: Date | string;
    bio?: string;
    burialPlace?: string;
    images?: string[];
    sub?: TArray;
    child?: TArray;
}