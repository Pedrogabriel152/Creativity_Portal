import { gql } from "@apollo/client";

export const GETMAINPOST = gql`
    query MainPost{
        mainPost {
            id
            like
            flag
            image
            subtitle
            user {
                email
                created_at
            }
            user_post{
                user_id
            }
        }
    }
`;

export const FEATUREDPOSTS = gql`
    query featuredPosts($first: Int!){
        featuredPosts (first: $first,
            where: {AND: [
                { column: FLAG, operator: EQ, value: true}]},
            orderBy: [{ column: CREATED_AT, order: DESC }]) {
            data{
                id
                title
                subtitle
                created_at
                like
                image
            }
            paginatorInfo{
                hasMorePages
                count
            }
        }
    }
`;

export const GETPOST = gql`
    query GetPost($id: Mixed!, $flag: Mixed!, $first: Int!){
        post(where: {AND: [
                { column: ID, operator: EQ, value: $id },
                { column: FLAG, operator: EQ, value: $flag}
        ]}, first: $first){
            id
            subtitle
            like
            flag
            user_id
            created_at
            title
            image
            comment
            comments(first: $first){
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
            user{
                image
                name
            }
            user_post{
                user_id
            }
        }
    }
`;

export const GETMYPOSTS = gql`
    query GetPosts($userId: Mixed!, $flag: Mixed!, $first: Int){
        posts(where: {
            AND: [
                { column: USER_ID, operator: EQ, value: $userId},
                { column: FLAG, operator: EQ, value: $flag}
            ]},
            orderBy: [{ column: CREATED_AT, order: DESC }],
            first: $first){
            data{
                id
                subtitle
                like
                flag
                user_id
                created_at
                title
                image
                comment
                user{
                    id
                    image
                    name
                }
                user_post{
                    user_id
                }
            }
            paginatorInfo{
                hasMorePages
                count
            }
        }
    }
`;

export const LIKE = gql`   
    mutation Like($id: ID!, $post_id: ID!){
        likeComment(id: $id, post_id: $post_id){
            code
            message
        }
    }
`;

export const GETEXPENSE = gql`
    query GetExpense($id: ID!, $user_id: ID!){
        expense(id: $id, user_id: $user_id){
            id
            description
            establishment
            installments
            expires
            installments_paid
            value_installment
            paid_expense
            merchandise_purchased
        }
    }
`;

export const UPDATEEXPENSE = gql`
    mutation EditExpense($id:ID!, $user_id:ID!, $expense: ExpenseInput!){
        editExpense(id: $id, user_id: $user_id, expense: $expense){
            code
            message
        }
    }
`;

export const PAYINSTALLMENT = gql`
    mutation PayInstallmentExpense($id: ID!, $user_id: ID!){
        payInstallmentExpense(id: $id, user_id: $user_id){
            code
            message
        }
    }
`;