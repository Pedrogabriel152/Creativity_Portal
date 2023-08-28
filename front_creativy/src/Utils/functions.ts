export const saveLocalStorage = (state: any) => {
    const authObj = {
        token: state.data.token,
        user_id: state.data.user_id,
        message: state.data.message,
        code: state.status
    };

    const authStr = JSON.stringify(authObj);

    removeLocalStorage();

    localStorage.setItem('@auth', authStr);
}

export const removeLocalStorage = () => {
    if(localStorage.getItem('@auth')){
        localStorage.removeItem('@auth');
    }
}
