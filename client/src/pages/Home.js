import Nav from '../components/NavTab'
import AuthModal from "../components/AuthModal"
import {useState} from 'react'
import {useCookies} from "react-cookie"

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
            <Nav
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="primary-title">Swipe Right®</h1>
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
export default Home

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
