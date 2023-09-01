import { IUser } from "./IUser"
import { IUserComment } from "./IUserComment"

export interface IComment {
    id: number
    like: number
    text: string
    user_id: number
    user: IUser
    user_comments?: IUserComment[]
}