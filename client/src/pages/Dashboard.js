// import {useEffect, useState} from 'react'
// import TinderCard from 'react-tinder-card'
// import ChatContainer from '../components/ChatContainer'
// import {useCookies} from 'react-cookie'
// import axios from 'axios'

// // import { useQuery, useMutation } from '@apollo/client';
// // import { QUERY_USER, QUERY_ME } from '../utils/queries';
// // import { ADD_FRIEND } from '../utils/mutations';
// // import Auth from '../utils/auth';

// const Dashboard = () => {

//     const [user, setUser] = useState(null)
//     const [genderedUsers, setGenderedUsers] = useState(null)
//     const [lastDirection, setLastDirection] = useState()
//     const [cookies, setCookie, removeCookie] = useCookies(['user'])

//     const userId = cookies.UserId


//     const getUser = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/user', {
//                 params: {userId}
//             })
//             setUser(response.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     const getGenderedUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/gendered-users', {
//                 params: {gender: user?.gender_interest}
//             })
//             setGenderedUsers(response.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         getUser()

//     }, [])

//     useEffect(() => {
//         if (user) {
//             getGenderedUsers()
//         }
//     }, [user])

//     const updateMatches = async (matchedUserId) => {
//         try {
//             await axios.put('http://localhost:3000/addmatch', {
//                 userId,
//                 matchedUserId
//             })
//             getUser()
//         } catch (err) {
//             console.log(err)
//         }
//     }


//     const swiped = (direction, swipedUserId) => {
//         if (direction === 'right') {
//             updateMatches(swipedUserId)
//         }
//         setLastDirection(direction)
//     }

//     const outOfFrame = (name) => {
//         console.log(name + ' left the screen!')
//     }

//     const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

//     const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))


//     console.log('filteredGenderedUsers ', filteredGenderedUsers)
//     return (
//         <>
//             {user &&
//             <div className="dashboard">
//                 <ChatContainer user={user}/>
//                 <div className="swipe-container">
//                     <div className="card-container">

//                         {filteredGenderedUsers?.map((genderedUser) =>
//                             <TinderCard
//                                 className="swipe"
//                                 key={genderedUser.user_id}
//                                 onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
//                                 onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
//                                 <div
//                                     style={{backgroundImage: "url(" + genderedUser.url + ")"}}
//                                     className="card">
//                                     <h3>{genderedUser.first_name}</h3>
//                                 </div>
//                             </TinderCard>
//                         )}
//                         <div className="swipe-info">
//                             {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
//                         </div>
//                     </div>
//                 </div>
//             </div>}
//         </>
//     )
// }
// export default Dashboard

import React, { useState } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Richard Hendricks',
    url: './img/richard.jpg'
  },
  {
    name: 'Erlich Bachman',
    url: './img/erlich.jpg'
  },
  {
    name: 'Monica Hall',
    url: './img/monica.jpg'
  },
  {
    name: 'Jared Dunn',
    url: './img/jared.jpg'
  },
  {
    name: 'Dinesh Chugtai',
    url: './img/dinesh.jpg'
  }
]

function Dashboard () {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default Dashboard