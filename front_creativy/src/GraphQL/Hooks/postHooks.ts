import { useApolloClient, useMutation, useQuery } from "@apollo/client";

// Interfaces
import { IMainPost } from "../../interfaces/IMainPost";
import { IFeaturedPosts } from "../../interfaces/IFeaturedPosts";
import { IPost } from "../../interfaces/IPost";
import { IResponse } from "../../interfaces/IResponse";

// States
import { getCommentsVar } from "../States/commentState";
import { createdPostVar, getFeaturedPostsVar, getMainPostVar, getMyPostsVar, getPostVar, likePostVar } from "../States/postState";

// Queries
import { FEATUREDPOSTS, GETMAINPOST, GETMYPOSTS, GETPOST } from "../Queries/postQuery";

// Mutations
import { CREATEPOST, LIKEPOST } from "../Mutations/postMutation";

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

export const useLikePost = () => {
    return useMutation<{ likePost: IResponse }>(LIKEPOST, {
        onCompleted(data) {
            if (data) {
                likePostVar(data.likePost);
            }
        },
    });
};

export const useGetMyPosts = (user_id: number, first: number) => {
    return useQuery<{ posts: IFeaturedPosts }>(GETMYPOSTS, {
        variables: {
            userId: user_id,
            flag: true,
            first: first,
        },
        onCompleted(data) {
            if (data) {
                console.log('Aquwhgsididgu',data)
                getMyPostsVar(data.posts);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useCreatePost = () => {
    return useMutation<{ createPost: IResponse }>(CREATEPOST, {
        onCompleted(data) {
            if (data) {
                createdPostVar(data.createPost);
            }
        }
    });
}

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