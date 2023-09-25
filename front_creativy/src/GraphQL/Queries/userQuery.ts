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