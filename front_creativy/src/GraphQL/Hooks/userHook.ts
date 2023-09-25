import { useMutation, useQuery } from "@apollo/client";
import { IResponse } from "../../interfaces/IResponse";
import { UPDATEUSER } from "../Mutations/userMutation";
import { updateUserVar, usersVar } from "../States/userSatate";
import { GETUSERS } from "../Queries/userQuery";
import { IUsers } from "../../interfaces/IUsers";

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