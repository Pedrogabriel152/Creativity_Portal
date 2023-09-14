import { gql } from "@apollo/client";

export const LIKECOMMENT = gql`   
    mutation LikeComment($id: ID!, $post_id: ID!, $first: Int!){
        likeComment(id: $id, post_id: $post_id, first: $first){
            code
            message
            comments {
                id
                text
                user_id
                like
                post_id
                user{
                    name
                    image
                }
                user_comments{
                    comment_id
                    user_id
                    id
                }
            }
        }
    }
`;

export const CREATECOMMENT = gql`
    mutation createComment($comment: CommentInput!, $first: Int!) {
        createComment(comment: $comment, first: $first) {
            code
            message
            comments {
                id
                text
                user_id
                like
                post_id
                user{
                    name
                    image
                }
                user_comments{
                    comment_id
                    user_id
                    id
                }
            }
        }
    }
`