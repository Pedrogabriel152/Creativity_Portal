import { gql } from "@apollo/client";

export const GETCOMMENTS = gql`
    query GetPosts($post_id: Mixed!, $flag: Mixed!, $first: Int){
        comments(where: {
        AND: [
            { column: POST_ID, operator: EQ, value: $post_id},
            { column: FLAG, operator: EQ, value: $flag}
        ]},
        orderBy: [{ column: CREATED_AT, order: DESC }],
        first: $first){
            data {
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
            paginatorInfo{
                hasMorePages
                count
            } 
        }
    }
`;