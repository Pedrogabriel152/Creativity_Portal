import { makeVar } from "@apollo/client";
import { IResponse } from "../../interfaces/IResponse";
import { IUsers } from "../../interfaces/IUsers";

export const updateUserVar = makeVar<IResponse | null>(null);
export const usersVar = makeVar<IUsers | null>(null);