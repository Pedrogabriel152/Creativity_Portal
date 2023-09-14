import { IComment } from "./IComment"

export interface IResponse {
    code: number
    message: string
    comments?: IComment[]
}