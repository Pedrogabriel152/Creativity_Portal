import { makeVar } from "@apollo/client";
import { IMainPost } from "../../interfaces/IMainPost";
import { IFeaturedPosts } from "../../interfaces/IFeaturedPosts";
import { IPost } from "../../interfaces/IPost";
import { ICommentPaginator } from "../../interfaces/ICommentPaginator";
import { IResponse } from "../../interfaces/IResponse";
// import { IPaginate } from "../../Interfaces/IPaginate";
// import { IResponse } from "../../Interfaces/IResponse";
// import { IExpense } from "../../Interfaces/IExpense";

export const getCommentsVar = makeVar<ICommentPaginator | null>(null);
export const likeCommentVar = makeVar<IResponse | null>(null);
export const createCommentVar = makeVar<IResponse | null>(null);
// export const createExpenseVar = makeVar<IResponse | null>(null);
// export const updateExpenseVar = makeVar<IResponse | null>(null);
// export const payInstallmentExpenseVar = makeVar<IResponse | null>(null);