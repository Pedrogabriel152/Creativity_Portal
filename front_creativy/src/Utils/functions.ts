import { IUser } from "../interfaces/IUser";
import { api } from "./Api";

export const saveLocalStorage = (state: IUser) => {
    const auth = JSON.stringify(state);

    const getLocal = localStorage.getItem('@auth');

    if(getLocal) {
        removeLocalStorage();
    }

    localStorage.setItem('@auth', auth);
}

export const removeLocalStorage = () => {
    localStorage.removeItem('@auth');
}
