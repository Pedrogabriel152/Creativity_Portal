import { IComment } from "./IComment"
import { IUser } from "./IUser"

export interface IResponse {
    code: number
    message: string
    comments?: IComment[]
    users?: IUser[] 
    paginatorInfo?: {
        hasMorePages: boolean
        count: number
    }
}