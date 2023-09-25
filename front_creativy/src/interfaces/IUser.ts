import { IPost } from "./IPost"

export interface IUser {
    id: number
    image?: any
    name: string
    email: string
    created_at: string
    password?: string
    confirmPassword?: string
    post?: IPost[]
    cover_image?: any
}