import React, {useState}from 'react';
import {useCookies} from "react-cookie"
import FriendList from '../components/FriendList';
import NavTab from '../components/NavTab';
import AuthModal from '../components/AuthModal';

import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

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





const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

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
                <h1 className="primary-title">PUPorPASS®</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Sign Up'}
                </button>


                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
            </div>
        </div>
    )
}
export default Home