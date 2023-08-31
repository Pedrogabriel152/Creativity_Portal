import { IUser } from "./IUser"

export interface IComment {
    id: number
    like: number
    text: string
    user_id: number
    user: IUser
}