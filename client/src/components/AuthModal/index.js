import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';


const AuthModal = ({ setShowModal,  isSignUp }) => {
    // const [email, setEmail] = useState(null)
    // const [password, setPassword] = useState(null)
    // const [confirmPassword, setConfirmPassword] = useState(null)
    // const [error, setError] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies(null)

    const [formState, setFormState] = useState({
        username: 'mleone',
        password: 'Soccer',
        email: 'marykleone@gmail.com',
        img: 'https://via.placeholder.io/150',
        age: 31,
        aboutMe: 'cool',
      });
      const [addUser, { error }] = useMutation(ADD_USER);

    let navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };

   


    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        

        try {
            // if (isSignUp && (password !== confirmPassword)) {
            //     setError('Passwords need to match!')
            //     return
            // }

            console.log(formState);

            const { data } = await addUser({
                variables: { ...formState },
              });


              Auth.login(data.addUser.token);
            
        

            // const response = await axios.post(`http://localhost:3000/${isSignUp ? 'signup' : 'login'}`, { email, password })
            // console.log(response);
            
            // setCookie('AuthToken', response.data.token)
            // setCookie('UserId', response.data.userId)

            // const success = response.status === 201
            // if (success && isSignUp) navigate ('/onboarding')
            // if (success && !isSignUp) navigate ('/dashboard')

            // window.location.reload()

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>


            <h2>{isSignUp ? 'SIGN UP': 'LOG IN'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            
            <form onSubmit={handleSubmit}>
            <input
                
                    type="username"
                    id="username"
                    name="username"
                    placeholder="username"
                    required={true}
                    value={formState.username}
                    onChange={handleChange}
                />
                
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    value={formState.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    value={formState.password}
                    onChange={handleChange}
                />
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    // line could be wrong
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                {/* <p>{error}</p> */}
            </form>

            <hr/>

        </div>
    )
}
export default AuthModal