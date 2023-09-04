import { gql } from "@apollo/client";

export const LIKECOMMENT = gql`   
    mutation LikeComment($id: ID!, $post_id: ID!){
        likeComment(id: $id, post_id: $post_id){
            code
            message
        }
    }
`;