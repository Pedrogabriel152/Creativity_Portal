import { useApolloClient, useMutation, useQuery } from "@apollo/client";

// Interfaces
import { IMainPost } from "../../interfaces/IMainPost";
import { IFeaturedPosts } from "../../interfaces/IFeaturedPosts";
import { IPost } from "../../interfaces/IPost";
import { IResponse } from "../../interfaces/IResponse";

// States
import { getCommentsVar } from "../States/commentState";
import { createdPostVar, deletedPostVar, getFeaturedPostsVar, getMainPostVar, getMyPostsVar, getPostVar, likePostVar, updatedPostVar } from "../States/postState";

// Queries
import { FEATUREDPOSTS, GETMAINPOST, GETMYPOSTS, GETPOST } from "../Queries/postQuery";

// Mutations
import { CREATEPOST, DELETEPOST, LIKEPOST, UPDATEPOST } from "../Mutations/postMutation";
import { GETUSER } from "../Queries/userQuery";

export const useGetMainPost = () => {
    return useQuery<{ mainPost: IMainPost }>(GETMAINPOST, {
        onCompleted(data) {
            if (data) {
                getMainPostVar(data.mainPost);
            }
        }
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
        }
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
        }
    });
};

export const useLikePost = (id?: number) => {
    return useMutation<{ likePost: IResponse }>(LIKEPOST, {
        onCompleted(data) {
            if (data) {
                likePostVar(data.likePost);
            }
        },
        refetchQueries: [
            {query: GETUSER, variables: {
                id: id
            }}
        ]
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
                getMyPostsVar(data.posts);
            }
        },
    });
};

export const useCreatePost = () => {
    return useMutation<{ createPost: IResponse }>(CREATEPOST, {
        onCompleted(data) {
            if (data) {
                createdPostVar(data.createPost);
            }
        },
        refetchQueries: [
            {query: FEATUREDPOSTS, variables: {
                first: 8
            }}, // DocumentNode object parsed with gql
        ],
    });
}

export const useDeletePost = () => {
    return useMutation<{ deletePost: IResponse }>(DELETEPOST, {
        onCompleted(data) {
            if (data) {
                deletedPostVar(data.deletePost);
            }
        },
        refetchQueries: [
            {query: FEATUREDPOSTS, variables: {
                first: 8
            }}, // DocumentNode object parsed with gql
        ],
    });
}

export const useUpdatePost = () => {
    return useMutation<{ updatePost: IResponse }>(UPDATEPOST, {
        onCompleted(data) {
            if (data) {
                updatedPostVar(data.updatePost);
            }
        },
        refetchQueries: [
            {query: FEATUREDPOSTS, variables: {
                first: 8
            }}, // DocumentNode object parsed with gql
        ],
    });
}