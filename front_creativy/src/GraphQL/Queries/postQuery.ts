import { gql } from "@apollo/client";

export const GETEXPENSES = gql`
    query MainPost{
        mainPost {
            id
            like
            flag
            image
            user {
                email
                created_at
            }
        }
    }
`;

export const GETACTIVEEXPENSES = gql`
    query ActiveExpenses($user_id: ID!, $first: Int!) {
        getActiveExpense(user_id: $user_id, first: $first){
            data{
                id
                establishment
                expires
                value_installment
                paid_expense
            }
            paginatorInfo{
                count
                currentPage
                lastPage
            }
        }
    }
`;

export const GETIDLEEXPENSES = gql`
    query IdleExpenses($user_id: ID!, $first: Int!) {
        getIdleExpense(user_id: $user_id, first: $first){
            data{
                id
                establishment
                expires
                value_installment
                paid_expense
            }
            paginatorInfo{
                count
                currentPage
                lastPage
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