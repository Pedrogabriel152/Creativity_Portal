import { ChangeEvent, FormEvent } from "react"
import { IComment } from "./IComment"

export interface IModalComment {
    openModal: boolean
    handleCloseModal: (status: boolean) => void
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    handleTextAreaOnChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
    comment: IComment
    text: string
}