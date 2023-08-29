import { IPost } from "./IPost";

export interface IFeaturedPosts {
    data: IPost[]
    paginatorInfo: {
        hasMorePages: boolean
        count: number
    }
}