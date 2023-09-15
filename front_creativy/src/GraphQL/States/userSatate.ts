import { makeVar } from "@apollo/client";
import { IResponse } from "../../interfaces/IResponse";

export const updateUserVar = makeVar<IResponse | null>(null);