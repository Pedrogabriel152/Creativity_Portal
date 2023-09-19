import { IComment } from "./IComment"
import { ICommentPaginator } from "./ICommentPaginator"

export interface IPost {
    id: number
    title: string
    subtitle: string
    like: number
    comment: number
    image: string
    created_at: string
    flag?: boolean
    user_id?: number
    comments?: ICommentPaginator
    user? :{
        id: number
        image: string
        name: string
    }
    user_post?: [
        {
            user_id?: number
        }
    ]
}