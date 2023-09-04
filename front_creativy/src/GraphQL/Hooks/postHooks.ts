import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { FEATUREDPOSTS, GETMAINPOST, GETPOST } from "../Queries/postQuery";
import { getFeaturedPostsVar, getMainPostVar, getPostVar } from "../States/postState";

// Context
// import { useUserContext } from "../../Context/UserContext";

// Interfaces
import { IMainPost } from "../../interfaces/IMainPost";
import { IFeaturedPosts } from "../../interfaces/IFeaturedPosts";
import { IPost } from "../../interfaces/IPost";
import { getCommentsVar } from "../States/commentState";

export const useGetMainPost = () => {
    return useQuery<{ mainPost: IMainPost }>(GETMAINPOST, {
        onCompleted(data) {
            if (data) {
                getMainPostVar(data.mainPost);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useGetFeaturedPosts = (first: number) => {
    return useQuery<{ featuredPosts: IFeaturedPosts }>(FEATUREDPOSTS, {
        variables: {
            first: first
        },
        onCompleted(data) {
            if (data) {
                getFeaturedPostsVar(data.featuredPosts);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useGetPost = (id: number, first: number) => {
    return useQuery<{ post: IPost }>(GETPOST, {
        variables: {
            id: id,
            flag: true,
            first: first
        },
        onCompleted(data) {
            if (data) {
                getCommentsVar(data.post.comments)
                getPostVar(data.post);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

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