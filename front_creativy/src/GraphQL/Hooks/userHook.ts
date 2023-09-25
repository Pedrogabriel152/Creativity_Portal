import { useMutation, useQuery } from "@apollo/client";
import { IResponse } from "../../interfaces/IResponse";
import { UPDATEUSER } from "../Mutations/userMutation";
import { updateUserVar, userVar, usersVar } from "../States/userSatate";
import { GETUSER, GETUSERS } from "../Queries/userQuery";
import { IUsers } from "../../interfaces/IUsers";
import { IUser } from "../../interfaces/IUser";

export const useUpdateUSer = () => {
    return useMutation<{ editUser: IResponse }>(UPDATEUSER, {
        onCompleted(data) {
            if (data) {
                updateUserVar(data.editUser);
            }
        },
    });
};

export const useGetUsers = (name: string, name2: string) => {
    return useQuery<{ users: IUsers}>(GETUSERS, {
        variables: {
            name: name,
            name2: name2
        },
        onCompleted(data) {
            if(data) usersVar(data.users);
        }
    });
};

export const useGetUser = (id: number) => {
    return useQuery<{ user: IUser }>(GETUSER, {
        variables: {
            id: id
        },
        onCompleted(data) {
            if(data) userVar(data.user);
        }
    });
}