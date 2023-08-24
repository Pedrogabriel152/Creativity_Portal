import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../Utils/Api';
import { IUser } from '../../interfaces/IUser';
import { RootState } from '../store';
import { IRegister } from '../../interfaces/IRegister';

const initialState: IUser = {
    token: '',
    loading: false,
    code: 500,
    user_id: 0
};

const getAuthFunc = (state: any, action: PayloadAction<IRegister>) => {
    const infos = localStorage.getItem('@auth');
    console.log("Infos",infos);
    
    if(infos){
        const auth = JSON.parse(infos);
        console.log(auth, state)
        if(auth) {
            return {
                ...state,
                code: auth.code,
                token: auth.token,
                user_id: auth.user_id,
                loading: auth.loading
            }
        }
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAuth: getAuthFunc,
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
  export const { getAuth } = userSlice.actions

  export const selectUser = (state: RootState) => state.user
  
  export default userSlice.reducer