import { useMutation, useQuery } from "@apollo/client";

// Mutations
import { CREATECOMMENT, LIKECOMMENT, UPDATECOMMENT } from "../Mutations/commentMutation";

// States
import { updatedCommentsVar, getCommentsVar } from "../States/commentState";

// Queries
import { GETPOST } from "../Queries/postQuery";
import { GETCOMMENTS } from "../Queries/commentQuery";

// Interfaces
import { ICommentPaginator } from "../../interfaces/ICommentPaginator";
import { IResponse } from "../../interfaces/IResponse";

export const useLikeComment = (id: number, first: number) => {
    return useMutation<{ likeComment: IResponse }>(LIKECOMMENT, {
        onCompleted(data) {
            if (data) {
                updatedCommentsVar(data.likeComment);
            }
        },
        refetchQueries: [
            {query: GETPOST, variables: {
                id,
                first,
                flag: true
            }}
        ],

    });
};

export const useCreateComment = (id: number, first: number) => {
    return useMutation<{ createComment: IResponse }>(CREATECOMMENT, {
        onCompleted(data) {
            if (data) {
                updatedCommentsVar(data.createComment);
            }
        },
        refetchQueries: [
            {query: GETPOST, variables: {
                id,
                first,
                flag: true
            }, },
            {query: GETCOMMENTS, variables: {
                post_id: id,
                flag: true,
                first: first
            }}
        ],
    });
};

export const useGetComments = (post_id: number, first: number) => {
    return useQuery<{comments: ICommentPaginator}>(GETCOMMENTS, {
        variables: {
            post_id: post_id,
            flag: true,
            first: first
        },
        onCompleted(data) {
            if(data) getCommentsVar(data.comments);
        },
    })
};

export const useUpdateComment = (id: number, first: number) => {
    return useMutation<{ updateComment: IResponse }>(UPDATECOMMENT, {
        onCompleted(data) {
            if (data) {
                updatedCommentsVar(data.updateComment);
            }
        },
        refetchQueries: [
            {query: GETPOST, variables: {
                id,
                first,
                flag: true
            }}
        ],

    });
};