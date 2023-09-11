import { gql } from "@apollo/client";

export const LIKEPOST = gql`
    mutation Like($id: ID!){
        likePost(id: $id){
            code
            message
        }
    }
`;