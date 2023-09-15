import { useMutation, useQuery } from "@apollo/client";
import { IResponse } from "../../interfaces/IResponse";
import { UPDATEUSER } from "../Mutations/userMutation";
import { updateUserVar } from "../States/userSatate";

export const useUpdateUSer = () => {
    return useMutation<{ editUser: IResponse }>(UPDATEUSER, {
        onCompleted(data) {
            if (data) {
                updateUserVar(data.editUser);
            }
        },
    });
};