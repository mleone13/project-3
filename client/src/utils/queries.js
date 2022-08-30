import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query allUsers{
    users {
        _id
        username
        email
        img
        age
        aboutMe
        friendCount
        friends {
            username
        }
    }
}
`;

export const QUERY_USER = gql`
    query getSingleUser($username: String!) {
    user(username: $username) {
        username
        email
        img
        age
        aboutMe
        friendCount
        friends {
        username
        }
    }
    }`;

export const QUERY_ME = gql`
    query getMe {
    me {
        username
        email
        img
        age
        aboutMe
        friendCount
        friends {
        username
        }
    }
    
}`;