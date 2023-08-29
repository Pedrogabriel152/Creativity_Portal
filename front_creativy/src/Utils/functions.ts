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

export const dateFormater = (create_at: string) => {
    const month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
    const newDate = new Date(create_at);
    const dateFomarted = ((newDate.getDate() + " " + month[(newDate.getMonth())] + " " + newDate.getFullYear()));
    return dateFomarted;
}
