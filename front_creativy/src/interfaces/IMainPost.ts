import { IUserPost } from "./IUserPost"

export interface IMainPost {
    id: number
    title: string
    subtitle: string
    like: number
    image: string
    user_post: IUserPost[]
}