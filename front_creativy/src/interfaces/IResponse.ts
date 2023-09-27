import { IComment } from "./IComment"
import { IPost } from "./IPost"
import { IUser } from "./IUser"

export interface IResponse {
    code: number
    message: string
    comments?: IComment[]
    users?: IUser[] 
    post?: IPost
    user?: IUser
    paginatorInfo?: {
        hasMorePages: boolean
        count: number
    }
}