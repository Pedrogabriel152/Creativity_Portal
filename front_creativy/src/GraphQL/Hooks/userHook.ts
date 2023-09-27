import { useMutation, useQuery } from "@apollo/client";

// Mutations
import { UPDATEUSER } from "../Mutations/userMutation";

// Queries
import { GETUSER, GETUSERS } from "../Queries/userQuery";

// Interfaces
import { IUsers } from "../../interfaces/IUsers";
import { IUser } from "../../interfaces/IUser";
import { IResponse } from "../../interfaces/IResponse";

// States
import { updateUserVar, userVar, usersVar } from "../States/userSatate";

export const useUpdateUSer = (id: number) => {
    return useMutation<{ editUser: IResponse }>(UPDATEUSER, {
        onCompleted(data) {
            if (data) {
                updateUserVar(data.editUser);
            }
        },
        refetchQueries: [
            {query: GETUSER, variables: {
                id,
            }}
        ],
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