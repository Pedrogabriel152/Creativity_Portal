export interface IModal {
    text: string
    handleClick: () => void
    handleClose: (status: boolean) => void
}