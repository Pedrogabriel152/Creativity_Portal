import { IComment } from "./IComment"

export interface ICommentPaginator {
    data?: IComment[]
    paginatorInfo?: {
        hasMorePages: boolean
        count: number
    }
}