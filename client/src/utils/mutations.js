import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
        username
        _id
    }
    }
}
`

export const ADD_USER = gql`
    mutation addUser
    ($username: String!, $password: String!, $email: String!, $img: String!, $age: Int!, $aboutMe: String!) 
    {
    addUser(username: $username, password: $password, email: $email, img: $img, age: $age, aboutMe: $aboutMe, bestFeature: $bestFeature, lookingFor:$lookingFor) 
    {
    token
    user {
        _id
        username
    }
    }
}`

export const ADD_FRIEND = gql`
    mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
        _id
        username
        friendCount
        friends {
        _id
        username
        }
    }
}`
export const REMOVE_FRIEND = gql`
mutation removeFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }`
export const UPDATE_ABOUTME = gql`
mutation updateAboutMe($aboutMe: String!) {
  updateAboutMe(aboutMe: $aboutMe) {
    _id
    username
    aboutMe
    img
    age
    bestFeature
    lookingFor
    friendCount
    friends {
      _id
      username
    }
  }
}`
export const UPDATE_BESTFEATURE = gql`
mutation updateBestFeature($bestFeature: String!) {
  updateBestFeature(bestFeature: $bestFeature) {
    _id
    username
    aboutMe
    img
    age
    bestFeature
    lookingFor
    friendCount
    friends {
      _id
      username
    }
  }
}`
export const UPDATE_LOOKINGFOR = gql`
mutation updateLookingFor($lookingFor: String!) {
  updateLookingFor(lookingFor: $lookingFor) {
    _id
    username
    aboutMe
    img
    age
    bestFeature
    lookingFor
    friendCount
    friends {
      _id
      username
    }
  }
}`
