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
import Dashboard from './Dashboard';
import Login from './Login';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Navigate, useNavigate } from 'react-router-dom';


const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [modalShow, setModalShow] = React.useState(false);
  const loggedIn = Auth.loggedIn();
  const { userData } = useQuery(QUERY_ME);
  const navigate = useNavigate();
  const handleLogout = event => {
    //event.preventDefault();
    console.log("You clicked logout")
    // use try/catch instead of promises to handle errors
    try {
      Auth.logout();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRedirect = event => {
    //event.preventDefault();
    console.log("You clicked redirect")
    // use try/catch instead of promises to handle errors
    try {
      navigate('/Dashboard')
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="overlay">
      <Button variant="primary" onClick={loggedIn ? () => { handleLogout() } : () => setModalShow(true)}>
        {loggedIn ? "Logout" : "Login"}
      </Button>

      <Login
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="home">
        <h1 className="primary-title">Find Your Forever Paws®</h1>
        <Button variant="primary" onClick={loggedIn ? () => { handleRedirect() } : () => setShowModal(true)}>
          {loggedIn ? 'Go To Dashboard' : 'Create Account'}
        </Button>
        <AuthModal
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </div>
    </div >
  )
}
export default Home
