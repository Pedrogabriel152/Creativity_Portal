import { useApolloClient, useMutation, useQuery } from "@apollo/client";
// import { GETEXPENSES, GETACTIVEEXPENSES, GETIDLEEXPENSES, CREATEEXPENSE, GETEXPENSE, UPDATEEXPENSE, PAYINSTALLMENT } from "./queries";
// import { GETFINANCE, GETFINANCIALSUMMARY, GETMONTHLYSUMMARY } from "../Finance/queries";
// import { createExpenseVar, getActiveExpenseVar, getExpenseVar, getExpensesVar, getIdleExpenseVar, payInstallmentExpenseVar, updateExpenseVar } from "./state";
// import { updateLink } from "../../utils/updateLink";

// Context
// import { useUserContext } from "../../Context/UserContext";

// // Interfaces
// import { IPaginate } from "../../Interfaces/IPaginate";
// import { IResponse } from "../../Interfaces/IResponse";
// import { IExpense } from "../../Interfaces/IExpense";

// export const useGetExpenses = (page: number) => {
//     const {getAuthentication} = useUserContext();
//     const auth = getAuthentication();
//     const client = useApolloClient();

//     updateLink(`http://localhost/graphql?page=${page}`, auth, client);

//     return useQuery<{ getAllExpense: IPaginate }>(GETEXPENSES, {
//         variables: {
//             user_id: auth?.user_id ? auth.user_id : 0,
//             first: page,
//         },
//         onCompleted(data) {
//             if (data) {
//                 getExpensesVar(data.getAllExpense);
//             }
//         },
//         fetchPolicy: 'cache-and-network',
//     });
// };

// export const useGetActiveExpenses = (page: number) => {
//     const {getAuthentication} = useUserContext();
//     const auth = getAuthentication();
//     const client = useApolloClient();

//     updateLink(`http://localhost/graphql?page=${page}`, auth, client);

//     return useQuery<{ getActiveExpense: IPaginate }>(GETACTIVEEXPENSES, {
//         variables: {
//             user_id: auth?.user_id ? auth.user_id : 0,
//             first: page,
//         },
//         onCompleted(data) {
//             if (data) {
//                 getActiveExpenseVar(data.getActiveExpense);
//             }
//         },
//         fetchPolicy: 'cache-and-network',
//     });
// };

// export const useGetIdleExpenses = (page: number) => {
//     const {getAuthentication} = useUserContext();
//     const auth = getAuthentication();
//     const client = useApolloClient();

//     updateLink(`http://localhost/graphql?page=${page}`, auth, client);

//     return useQuery<{ getIdleExpense: IPaginate }>(GETIDLEEXPENSES, {
//         variables: {
//             user_id: auth?.user_id ? auth.user_id : 0,
//             first: page,
//         },
//         onCompleted(data) {
//             if (data) {
//                 getIdleExpenseVar(data.getIdleExpense);
//             }
//         },
//         fetchPolicy: 'cache-and-network',
//     });
// };

// export const useCreateExpense = () => {
//     const {getAuthentication} = useUserContext();
//     const auth = getAuthentication();
//     return useMutation<{createExpense: IResponse}>(CREATEEXPENSE, {
//         onCompleted(data) {
//             if(data){
//                 createExpenseVar(data?.createExpense)
//             }
//         },
//         refetchQueries: [
//             {query: GETFINANCE, variables: {
//                 user_id: auth?.user_id? auth.user_id : 0
//             }},
//             {query: GETEXPENSES, variables: {
//                 user_id: auth?.user_id ? auth.user_id : 0,
//                 first: 1
//             }},
//             {query: GETACTIVEEXPENSES, variables: {
//                 user_id: auth?.user_id ? auth.user_id : 0,
//                 first: 1
//             }},
//             {query: GETIDLEEXPENSES, variables: {
//                 user_id: auth?.user_id ? auth.user_id : 0,
//                 first: 1
//             }},
//             {query: GETFINANCIALSUMMARY, variables: {
//                 user_id: auth?.user_id? auth.user_id : 0
//             }},
//             {query: GETMONTHLYSUMMARY, variables: {
//                 user_id: auth?.user_id? auth.user_id : 0
//             }}
//         ]
//     })
// }

// export const useGetExpense = (id: number, user_id: number) => {
//     return useQuery<{ expense: IExpense }>(GETEXPENSE, {
//         variables: {
//             user_id: user_id,
//             id: id,
//         },
//         onCompleted(data) {
//             if (data) {
//                 getExpenseVar(data.expense);
//             }
//         },
//         fetchPolicy: 'cache-and-network',
//     });
// }

// export const useUpdateExpense = () => {
//     const {getAuthentication} = useUserContext();
//     const auth = getAuthentication();
//     return useMutation<{editExpense: IResponse}>(UPDATEEXPENSE, {
//         onCompleted(data) {
//             if(data) {
//                 updateExpenseVar(data.editExpense);
//             }
//         },
//         refetchQueries: [
//             {query: GETFINANCE, variables: {
//                 user_id: auth?.user_id? auth.user_id : 0
//             }},
//             {query: GETEXPENSES, variables: {
//                 user_id: auth?.user_id ? auth.user_id : 0,
//                 first: 1
//             }},
//             {query: GETACTIVEEXPENSES, variables: {
//                 user_id: auth?.user_id ? auth.user_id : 0,
//                 first: 1
//             }},
//             {query: GETIDLEEXPENSES, variables: {
//                 user_id: auth?.user_id ? auth.user_id : 0,
//                 first: 1
//             }}
//         ]
//     })
// }

// export const usePayInstallmentExpense = () => {
//     const {getAuthentication} = useUserContext();
//     const auth = getAuthentication();
//     return useMutation<{payInstallmentExpense: IResponse}>(PAYINSTALLMENT, {
//         onCompleted(data) {
//             if(data) {
//                 payInstallmentExpenseVar(data.payInstallmentExpense);
//             }
//         },
//         refetchQueries: [
//             {query: GETFINANCE, variables: {
//                 user_id: auth?.user_id? auth.user_id : 0
//             }},
//             {query: GETEXPENSES, variables: {
//                 user_id: auth?.user_id ? auth.user_id : 0,
//                 first: 1
//             }},
//             {query: GETACTIVEEXPENSES, variables: {
//                 user_id: auth?.user_id ? auth.user_id : 0,
//                 first: 1
//             }},
//             {query: GETIDLEEXPENSES, variables: {
//                 user_id: auth?.user_id ? auth.user_id : 0,
//                 first: 1
//             }}
//         ]
//     })
// }