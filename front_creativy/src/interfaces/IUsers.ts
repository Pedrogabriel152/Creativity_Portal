import { IUser } from "./IUser";

export interface IUsers {
    data: IUser[]
    paginatorInfo: {
        count: number
        hasMorePages: boolean
    }
}