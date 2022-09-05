import React, {useState}from 'react';
import {useCookies} from "react-cookie"
import FriendList from '../components/FriendList';
import NavTab from '../components/NavTab';
import AuthModal from '../components/AuthModal';
import Header from '../components/Header/index'
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';


import '../index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// import Home from './pages/Home';
// import NoMatch from './pages/NoMatch';
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import AuthModal from './components/AuthModal';
// import Header from './components/Header';
// import Onboarding from './pages/Onboarding';















const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const httpLink = createHttpLink({
        uri: '/graphql',
      });
      const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('id_token');
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });
    
    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className="overlay">
            
            <NavTab
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
                />

            <div className="home">
                <h1 className="primary-title">Find Your Forever Paws®</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>


                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                    )}
            </div>
        </div>
    )
}

export default Home;

    // const Home = () => {
    //   const { loading, data } = useQuery(QUERY_USERS);
    //   const users = data?.users || [];
    
    //   return (
    //     <main>
    //       <div className="flex-row justify-space-between">
    //         <div className="col-12 mb-3">
    //           {loading ? (
    //             <div>Loading...</div>
    //           ) : (
    //             <FriendList
    //               users={users}
    //               title="Some Feed for Thought(s)..."
    //             />
    //           )}hello from
    //         </div>
    //       </div>
    //     </main>
    //   );
    // };
    
    
    
    // export default Home;