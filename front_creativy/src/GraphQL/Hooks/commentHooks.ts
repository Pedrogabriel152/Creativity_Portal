import { useMutation, useQuery } from "@apollo/client";
import { IResponse } from "../../interfaces/IResponse";
import { CREATECOMMENT, LIKECOMMENT } from "../Mutations/commentMutation";
import { createCommentVar, getCommentsVar, likeCommentVar } from "../States/commentState";
import { GETPOST } from "../Queries/postQuery";
import { GETCOMMENTS } from "../Queries/commentQuery";
import { IComment } from "../../interfaces/IComment";
import { ICommentPaginator } from "../../interfaces/ICommentPaginator";

export const useLikeComment = (id: number, first: number) => {
    return useMutation<{ likeComment: IResponse }>(LIKECOMMENT, {
        onCompleted(data) {
            if (data) {
                likeCommentVar(data.likeComment);
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
                createCommentVar(data.createComment);
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
}