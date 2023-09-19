import { gql } from "@apollo/client";

export const LIKEPOST = gql`
    mutation Like($id: ID!, $first: Int!){
        likePost(id: $id, first: $first){
            code
            message
            post {
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
    }
`;

export const CREATEPOST = gql`
    mutation CreatePost($post: PostInput!) {
        createPost(post: $post) {
            code
            message
        }
    }
`;

export const DELETEPOST = gql`
    mutation DeletePost($id: ID!, $user_id: Int!) {
        deletePost(id: $id, user_id: $user_id) {
            code
            message
        }
    }
`;