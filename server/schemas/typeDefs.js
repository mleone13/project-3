const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
    type User {
        _id: ID
        username: String
        email: String
        img: String
        age: Int
        aboutMe: String
        friendCount: Int
        friends: [User]
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }
    type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, img: String!, age: Int!, aboutMe:String!): Auth
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    updateAboutMe(aboutMe:String!): User
    }

`;
module.exports = typeDefs;


