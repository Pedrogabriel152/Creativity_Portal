import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// API
import { api } from "../Utils/Api";
import { IRegister } from "../interfaces/IRegister";
import { saveLocalStorage } from "../Utils/functions";

export const AuthContext = createContext({});

const AuthProvider = ({children}: any) => {
    const [auth, setAuth] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    const createUser = (newUser: IRegister) => {
        if(!newUser.email || !newUser.name || !newUser.password || !newUser.confirmPassword){
            alert('Preença todos os campos');
            return;
        }
    
        if(newUser.password !== newUser.confirmPassword) {
            alert('As senhas precisam ser iguais!.');
            return;
        }
        setAuth({
            loading: true
        });
    
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

                saveLocalStorage(auth);
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
            })
        });
    }

    return (
        <AuthContext.Provider 
            value={{ 
                auth,
                loading,
                createUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;