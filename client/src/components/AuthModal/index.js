import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { ADD_USER } from '../../utils/mutations'
import { useMutation } from '@apollo/client'
import placeholderPhoto from '../images/dog_logo.png'
import Auth from '../../utils/auth';
//import { create } from '../../../../server/models/User'


const AuthModal = ({ setShowModal, isSignUp }) => {
    // const [email, setEmail] = useState(null)
    // const [password, setPassword] = useState(null)
    // const [confirmPassword, setConfirmPassword] = useState(null)
    // const [username, setUsername] = useState(null)
    // const [aboutMe, setAboutMe] = useState(null)
    // const [img, setImg] = useState(placeholderPhoto)
    // const [age, setAge] = useState(null)
    // const [bestFeature, setBestFeature] = useState(null)
    // const [lookingFor, setLookingFor] = useState(null)
    // const [error, setError] = useState(null)
    // const [cookies, setCookie, removeCookie] = useCookies(null)

    const [formState, setFormState] = useState(
        { username: '', email: '', password: '', aboutMe: '', img: '', age: '', bestFeature: '', lookingFor: '' });

    const [addUser, { error }] = useMutation(ADD_USER)
    let navigate = useNavigate()

    //console.log(email, password, confirmPassword)

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


    // submit form (notice the async!)
    const handleFormSubmit = async event => {
        event.preventDefault();

        // use try/catch instead of promises to handle errors
        try {
            const { data } = await addUser({
                variables: { ...formState }
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>

            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By Signing Up, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    value={formState.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    value={formState.password}
                    onChange={handleChange}
                />
                {isSignUp && <input
                    type="text"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={handleChange}
                />}
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    required={true}
                    value={formState.username}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="aboutMe"
                    name="aboutMe"
                    placeholder="About Me"
                    required={true}
                    value={formState.aboutMe}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="age"
                    required={true}
                    value={formState.age}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="bestFeature"
                    name="bestFeature"
                    placeholder="My Best Feature..."
                    required={true}
                    value={formState.bestFeature}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="lookingFor"
                    name="lookingFor"
                    placeholder="I'm Looking For.."
                    required={true}
                    value={formState.lookingFor}
                    onChange={handleChange}
                />
                <input className="secondary-button" type="submit" />
                <p>{error}</p>
            </form>


        </div>
    )
}
export default AuthModal