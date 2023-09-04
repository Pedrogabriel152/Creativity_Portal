import { useMutation } from "@apollo/client";
import { IResponse } from "../../interfaces/IResponse";
import { LIKECOMMENT } from "../Mutations/commentMutation";
import { likeCommentVar } from "../States/commentState";
import { GETPOST } from "../Queries/postQuery";

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