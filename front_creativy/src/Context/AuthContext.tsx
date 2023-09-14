import { useState, createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Utils
import { api } from "../Utils/Api";
import { saveLocalStorage } from "../Utils/functions";

// Toastify
import { toast } from "react-toastify";

// Interfaces
import { IAuth } from "../interfaces/IAuth";
import { IAuthContext } from "../interfaces/IAuthContext";
import { IRegister } from "../interfaces/IRegister";

export const AuthContext = createContext<IAuthContext>({
    createUser: () => null,
    getLocalStorage: () => null,
    loading: false
});

const AuthProvider = ({children}: any) => {
    const [auth, setAuth] = useState<IAuth>();
    const [loading, setLoading] = useState<boolean>(false);
    

    const createUser = (newUser: IRegister, setUser: any) => {
        if(!newUser.email || !newUser.name || !newUser.password || !newUser.confirmPassword){
            toast.error('Preença todos os campos');
            return;
        }
    
        if(newUser.password !== newUser.confirmPassword) {
            toast.error('As senhas precisam ser iguais!');
            return;
        }

        setLoading(true);

        api.get('/sanctum/csrf-cookie').then(response => { 
            api.post('/api/register', {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password
            })
            .then((res: any) => {
                console.log(res.data);
                setAuth({
                    ...auth,
                    token: res.data.token,
                    code: res.status,
                    user_id: res.data.user_id,
                    loading: false 
                });

                if(auth) {
                    saveLocalStorage(auth);
                    setUser(auth);
                }
            })
            .catch((error: any) => {
                console.log(error)
                setAuth({
                    ...auth,
                    token: '',
                    code: error.response.status,
                    user_id: 0,
                    loading: false 
                });

                if(auth) {
                    saveLocalStorage(auth);
                    setUser(auth);
                }
            })
        });
    }

    const getLocalStorage = () => {
        const infos = localStorage.getItem('@auth');
        if(infos) {
            return JSON.parse(infos);
        }
    }

    return (
        <AuthContext.Provider 
            value={{ 
                loading,
                createUser, 
                getLocalStorage
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export default AuthProvider;