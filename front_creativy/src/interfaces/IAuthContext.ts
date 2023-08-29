import { IRegister } from "./IRegister";

export interface IAuthContext {
    loading: boolean
    getLocalStorage: () => any
    createUser: (newUser: IRegister, setAuth: any) => void
}