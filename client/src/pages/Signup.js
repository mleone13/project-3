<<<<<<< HEAD
// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
=======
import React, { Component, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
// import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import NavTab from '../components/NavTab'
>>>>>>> 7b8579424693c436f9e4cc93e6951b216d17c540

// import Auth from '../utils/auth';

<<<<<<< HEAD
// const Signup = () => {
//   const [formState, setFormState] = useState({
//     username: '',
//     email: '',
//     password: '',
//     img: '',
//     age: '',
//     aboutMe: '',
//   });
//   const [addUser, { error }] = useMutation(ADD_USER);

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };
=======
const Signup = () => {
  const [cookies] = useCookies(null)
  const [formData, setFormData] = useState({
      user_id: cookies.UserId,
      first_name: "",
      dob_day: "",
      dob_month: "",
      dob_year: "",
      show_gender: false,
      gender_identity: "man",
      gender_interest: "woman",
      url: "",
      about: "",
      matches: [],
  });

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
      console.log('submitted')
      e.preventDefault()
      try {
          const response = await axios.put('http://localhost:8000/user', {formData})
          console.log(response)
          const success = response.status === 200
          if (success) navigate('/dashboard')
      } catch (err) {
          console.log(err)
      }

  }
  

  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (e) => {
    console.log('e', e)
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
        ...prevState,
        [name]: value
    }))
}
>>>>>>> 7b8579424693c436f9e4cc93e6951b216d17c540

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

<<<<<<< HEAD
//     try {
//       const { data } = await addUser({
//         variables: { ...formState },
//       });
=======
    try {
      const { data } = await addUser({
        variables: { ...useState },
      });
>>>>>>> 7b8579424693c436f9e4cc93e6951b216d17c540

//       console.log (data)
      
//       Auth.login(data.addUser.token);
//     } catch (e) {
//       console.error(e);
//     }
//   };

<<<<<<< HEAD
//   return (
//     <main className="flex-row justify-center mb-4">
//       <div className="col-12 col-md-6">
//         <div className="card">
//           <h4 className="card-header">Sign Up</h4>
//           <div className="card-body">
//             <form onSubmit={handleFormSubmit}>
//               <input
//                 className="form-input"
//                 placeholder="Your username"
//                 name="username"
//                 type="username"
//                 id="username"
//                 value={formState.username}
//                 onChange={handleChange}
//               />
//               <input
//                 className="form-input"
//                 placeholder="Your email"
//                 name="email"
//                 type="email"
//                 id="email"
//                 value={formState.email}
//                 onChange={handleChange}
//               />
//               <input
//                 className="form-input"
//                 placeholder="******"
//                 name="password"
//                 type="password"
//                 id="password"
//                 value={formState.password}
//                 onChange={handleChange}
//               />
//               <button className="btn d-block w-100" type="submit">
//                 Submit
//               </button>
//             </form>

//             {error && <div>Signup failed</div>}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };
=======
  return (
    <>   
     <NavTab 
      minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
          <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </section>       
            <label>Birthday</label>
            <div className="multiple-input-container"></div>
              <input
                 id="dob_day"
                 type="number"
                 name="dob_day"
                 placeholder="DD"
                 required={true}
                 value={formData.dob_day}
                 onChange={handleChange}
              />
              <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
              />
              <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
              />

              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </main>

  </>
  );
};
>>>>>>> 7b8579424693c436f9e4cc93e6951b216d17c540

// export default Signup;
