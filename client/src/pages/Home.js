import Nav from '../components/NavTab'
import React, { useState } from 'react'
import { useCookies } from "react-cookie"
// import FriendList from '../components/FriendList';
// import NavTab from '../components/NavTab';
import AuthModal from '../components/AuthModal';
// import Header from '../components/Header/index'
import { useQuery } from '@apollo/client';
// import { QUERY_USERS } from '../utils/queries';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries'
import '../index.css';
import Onboarding from './Onboarding';
import Login from './Login';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {
//   ApolloClient,
//   InMemoryCache,
//   createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [modalShow, setModalShow] = React.useState(false);
  const loggedIn = Auth.loggedIn();
  const { userData } = useQuery(QUERY_ME);
  // const [cookies, setCookie, removeCookie] = useCookies(['user'])
  //const authToken = cookies.AuthToken

  // const httpLink = createHttpLink({
  //     uri: '/graphql',
  //   });
  //   const authLink = setContext((_, { headers }) => {
  //     const token = localStorage.getItem('id_token');
  //     return {
  //       headers: {
  //         ...headers,
  //         authorization: token ? `Bearer ${token}` : '',
  //       },
  //     };
  //   });

  //   const client = new ApolloClient({
  //     link: authLink.concat(httpLink),
  //     cache: new InMemoryCache(),
  //   });

  // const handleClick = () => {
  //   // if (authToken) {
  //   //   removeCookie('UserId', cookies.UserId)
  //   //   removeCookie('AuthToken', cookies.AuthToken)
  //   //   window.location.reload()
  //   //   return
  //   // }
  //   if (Auth.loggedIn()) {
  //     return <Onboarding />
  //   }
  //   setShowModal(true)
  //   setIsSignUp(true)
  // }

  return (
    <div className="overlay">
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Login
      </Button>

      <Login
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="home">
        <h1 className="primary-title">Find Your Forever Paws®</h1>
        {/* <button className="primary-button" >
          {loggedIn ? 'Signout' : 'Create Account'}
        </button>


        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )} */}
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Sign Up
        </Button>
        <AuthModal
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </div>
    </div>
  )
}
export default Home
