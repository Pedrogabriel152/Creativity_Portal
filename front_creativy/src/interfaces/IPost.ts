export interface IPost {
    id: number
    title: string
    subtitle: string
    like: number
    image: string
    created_at: string
    flag?: boolean
    user_id?: number
    user? :{
        image: string
        name: string
    }
}