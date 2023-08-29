import { makeVar } from "@apollo/client";
import { IMainPost } from "../../interfaces/IMainPost";
import { IFeaturedPosts } from "../../interfaces/IFeaturedPosts";
import { IPost } from "../../interfaces/IPost";
// import { IPaginate } from "../../Interfaces/IPaginate";
// import { IResponse } from "../../Interfaces/IResponse";
// import { IExpense } from "../../Interfaces/IExpense";

export const getMainPostVar = makeVar<IMainPost | null>(null);
export const getFeaturedPostsVar = makeVar<IFeaturedPosts | null>(null);
// export const getActiveExpenseVar = makeVar<IPaginate | null>(null);
// export const getIdleExpenseVar = makeVar<IPaginate | null>(null);
// export const createExpenseVar = makeVar<IResponse | null>(null);
// export const updateExpenseVar = makeVar<IResponse | null>(null);
// export const payInstallmentExpenseVar = makeVar<IResponse | null>(null);