import { gql } from "@apollo/client";

export const UPDATEUSER = gql`
    mutation editUser($user: UserInput!){
        editUser(user: $user) {
            code
            message
            user {
                id
                name
                image
                cover_image
                email
            }
        }
    }
`;