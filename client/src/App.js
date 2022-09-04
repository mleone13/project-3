import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavTabs from './components/NavTab';
import AuthModal from './components/AuthModal';

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


function App() {
  return (
    
    <ApolloProvider client={client}>
      <Router>
        {/* <div className="flex-column justify-flex-start min-100-vh"> */}
        <div>
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<AuthModal/>}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
                <Route path="/" element={<Home/>}/>
                {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
                {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
            </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
    
  );
}
export default App;




// import { QUERY_ME } from './utils/queries'
// import { useQuery, useMutation, useLazyQuery} from '@apollo/client'
// import { ADD_USER } from './utils/mutations';



 // const {loading, data} = useQuery(QUERY_ME)// onpage load
  // const [addUser, {error}] = useMutation(ADD_USER)// returns a function you can call at anytime
  // const [queryMe, additionalInfo] = useLazyQuery(QUERY_ME)// returns a function you can call at anytime
  // addUser("Daniel","daniel@email.com", "123abc", "www.somewhere.com", 23, "Coding is fun")
  // queryMe()