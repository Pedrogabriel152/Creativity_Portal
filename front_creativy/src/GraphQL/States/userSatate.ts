import { makeVar } from "@apollo/client";

// Interfaces
import { IResponse } from "../../interfaces/IResponse";
import { IUsers } from "../../interfaces/IUsers";
import { IUser } from "../../interfaces/IUser";

export const updateUserVar = makeVar<IResponse | null>(null);
export const usersVar = makeVar<IUsers | null>(null);
export const userVar = makeVar<IUser | null>(null);