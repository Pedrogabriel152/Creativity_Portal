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
        featuredPosts (first: $first,orderBy: [{ column: CREATED_AT, order: DESC }]) {
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
    query GetPost($id: Mixed!, $flag: Mixed!){
        post(where: {AND: [
                { column: ID, operator: EQ, value: $id },
                { column: FLAG, operator: EQ, value: $flag}
        ]}){
            id
            subtitle
            like
            flag
            user_id
            created_at
            title
            user{
                image
                name
            }
        }
    }
`;

export const CREATEEXPENSE = gql`   
    mutation CreateExpense($expense: ExpenseInput!){
        createExpense(expense: $expense){
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