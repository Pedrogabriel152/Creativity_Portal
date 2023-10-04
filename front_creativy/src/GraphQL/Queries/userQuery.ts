import { gql } from "@apollo/client";

export const GETUSERS = gql`
    query GetUsersByName($name: Mixed!, $name2: Mixed!) {
        users(where: {OR: [
            { column: NAME, operator: LIKE, value: $name },
            { column: NAME, operator: LIKE, value: $name2}
        ]}) {
            data {
                id
                name
                image
            }
            paginatorInfo{
                count
                hasMorePages
            }
        }
    }
`;

export const GETUSER = gql`
    query GetUser($id: ID!) {
        user(id: $id){
            id
            name
            image
            cover_image
            email
            posts {
                id
                title
                subtitle
                created_at
                image
                like
                comment
                user_post{
                    user_id
                    post_id
                }
            }
        }
    }
`;