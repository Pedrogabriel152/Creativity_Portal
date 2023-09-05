import { useMutation } from "@apollo/client";
import { IResponse } from "../../interfaces/IResponse";
import { CREATECOMMENT, LIKECOMMENT } from "../Mutations/commentMutation";
import { createCommentVar, likeCommentVar } from "../States/commentState";
import { GETPOST } from "../Queries/postQuery";
import { GETCOMMENTS } from "../Queries/commentQuery";

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