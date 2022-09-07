
import React from 'react';
import './App.css';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/Onboarding'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {authToken && <Route path="/dashboard" element={<Dashboard />} />}
                {authToken && <Route path="/onboarding" element={<OnBoarding />} />}

            </Routes>
        </BrowserRouter>
    )
}

export default App




// import { QUERY_ME } from './utils/queries'
// import { useQuery, useMutation, useLazyQuery} from '@apollo/client'
// import { ADD_USER } from './utils/mutations';



 // const {loading, data} = useQuery(QUERY_ME)// onpage load
  // const [addUser, {error}] = useMutation(ADD_USER)// returns a function you can call at anytime
  // const [queryMe, additionalInfo] = useLazyQuery(QUERY_ME)// returns a function you can call at anytime
  // addUser("Daniel","daniel@email.com", "123abc", "www.somewhere.com", 23, "Coding is fun")
  // queryMe()