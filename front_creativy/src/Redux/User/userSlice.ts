import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../Utils/Api';
import { IUser } from '../../interfaces/IUser';
import { RootState } from '../store';
import { IRegister } from '../../interfaces/IRegister';

const initialState: IUser = {
    token: '',
    loading: false
};

const createUserFunc = (state: any, action: PayloadAction<IRegister>) => {
    if(!action.payload.email || !action.payload.name || !action.payload.password || !action.payload.confirmPassword){
        alert('Preença todos os campos');
        return;
    }

    if(action.payload.password !== action.payload.confirmPassword) {
        alert('As senhas precisam ser iguais!.');
        return;
    }

    console.log(action.payload)

    api.get('/sanctum/csrf-cookie').then(response => { 
        api.post('/api/register', {
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password
        })
        .then((res: any) => {
            console.log(res.data);
        })
        .catch((error: any) => {
            console.log(error)
            // return {
            //     ...state,
            //     user: {
            //         token: res.
            //     }
            // }
        })
    });
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: createUserFunc,
    }
    // initialState: {
    //   value: 0,
    // },
    // reducers: {
    //   increment: (state) => {
    //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //     // doesn't actually mutate the state because it uses the Immer library,
    //     // which detects changes to a "draft state" and produces a brand new
    //     // immutable state based off those changes.
    //     // Also, no return statement is required from these functions.
    //     state.value += 1
    //   },
    //   decrement: (state) => {
    //     state.value -= 1
    //   },
    //   incrementByAmount: (state, action) => {
    //     state.value += action.payload
    //   },
    // },
  })
  
  // Action creators are generated for each case reducer function
  export const { createUser } = userSlice.actions

  export const selectUser = (state: RootState) => state.user
  
  export default userSlice.reducer