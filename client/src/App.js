
import React from 'react';
import './App.css';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    from,
    HttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/Onboarding'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'
// const uri = process.env.URI
// const errorLink = onError(({ graphqlErrors, networkError }) => {
//     if (graphqlErrors) {
//         graphqlErrors.map(({ message, location, path }) => {
//             alert(`Graphql error ${message}`)
//         });
//     }
// })

// const link = from([
//     errorLink,
//     new HttpLink({ uri })
// ]);

// const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: link,
// });
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


const App = () => {
    // const [cookies, setCookie, removeCookie] = useCookies(['user'])

    // const authToken = cookies.AuthToken

    // const getUserInfo = () {

    // }

    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/onboarding" element={<OnBoarding />} />

                </Routes>
            </Router>
        </ApolloProvider>
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