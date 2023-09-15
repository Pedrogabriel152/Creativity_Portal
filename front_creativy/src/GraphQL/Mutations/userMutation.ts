import { gql } from "@apollo/client";

export const UPDATEUSER = gql`
    mutation editUser($user: UserInput!){
        editUser(user: $user) {
            code
            message
        }
    }
`;