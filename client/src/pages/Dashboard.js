import TinderCard from "react-tinder-card";
import React, { useState, useEffect } from "react";
import ChatContainer from "../components/ChatContainer"
import { useCookies } from "react-cookie";
import { useQuery, gql } from "@apollo/client"
import { QUERY_USERS } from "../utils/queries";


const Dashboard = () => {
  const { loading, error, data } = useQuery(QUERY_USERS)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (data) {

      setUsers(data.users)
      console.log(data)
      console.log(data.users.users)
      console.log(data.users.username)
    }
  }, [data])

  //console.log(data.users)
  // console.log(users)
  // console.log(users.username)
  // const character = [
  //   {
  //     name: 'Max',
  //     url: 'https://i.imgur.com/HfAuR39.png'
  //   },
  //   {
  //     name: 'Tammy',
  //     url: 'https://i.imgur.com/HfAuR39.png'
  //   },
  //   {
  //     name: 'Frank',
  //     url: 'https://i.imgur.com/HfAuR39.png'
  //   },
  //   {
  //     name: 'Mini',
  //     url: 'https://i.imgur.com/HfAuR39.png'
  //   },
  //   {
  //     name: 'Zach',
  //     url: 'https://i.imgur.com/HfAuR39.png'
  //   }
  // ]


  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')

  }
  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swiper-container">
        <div className="card-container">

          {users.map((users) =>
            <TinderCard
              className='swipe' key={users._id}
              onSwipe={(dir) => swiped(dir, users.username)}
              onCardLeftScreen={() => outOfFrame(users.username)}>
              <div
                className='card'>
                <h3>{users.username}</h3>
                <img src={users.img} />
                <div>
                  <h4>Age: {users.age}</h4>
                  <h4>{users.aboutMe}</h4>
                  <h4>My best feature: {users.bestFeature}</h4>
                  <h4>Looking for someone: {users.lookingFor}</h4>
                </div>
              </div>
            </TinderCard>
          )}

          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection} </p> : <p />}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard;