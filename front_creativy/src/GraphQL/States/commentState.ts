import { makeVar } from "@apollo/client";

// Interfaces
import { ICommentPaginator } from "../../interfaces/ICommentPaginator";
import { IResponse } from "../../interfaces/IResponse";

export const getCommentsVar = makeVar<ICommentPaginator | null>(null);
export const updatedCommentsVar = makeVar<IResponse | null>(null);