import { IRegister } from "./IRegister";
import { IUser } from "./IUser";

export interface IAuthContext {
    loading: boolean
    getLocalStorage: () => any
    createUser: (newUser: IRegister, setAuth: any) => void
}