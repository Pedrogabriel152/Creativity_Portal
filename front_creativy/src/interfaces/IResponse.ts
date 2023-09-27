import { IComment } from "./IComment"
import { IUser } from "./IUser"

export interface IResponse {
    code: number
    message: string
    comments?: IComment[]
    users?: IUser[] 
    user?: IUser
    paginatorInfo?: {
        hasMorePages: boolean
        count: number
    }
}