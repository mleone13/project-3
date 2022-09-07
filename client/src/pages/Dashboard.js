import TinderCard from "react-tinder-card";
import React, { useState, useEffect } from "react";
import ChatContainer from "../components/ChatContainer"
import { useCookies } from "react-cookie";
import { useQuery, gql, useMutation } from "@apollo/client"
import { QUERY_USERS, QUERY_ME } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations"
import Auth from '../utils/auth';

const Dashboard = () => {
  const { loading, error, data } = useQuery(QUERY_USERS)
  const { dataMe } = useQuery(QUERY_ME)
  const [users, setUsers] = useState([])
  const [addFriend] = useMutation(ADD_FRIEND)
  useEffect(() => {
    if (data) {

      setUsers(data.users)
    }
  }, [data])
  if (Auth.loggedIn) {

    console.log("hello, i'm logged in")
  }
  console.log({ dataMe })


  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete, addFriendId) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    if (lastDirection === "right") {

      addFriend({
        variables:
          { _id: addFriendId }
      })
    }
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
              onSwipe={(dir) => swiped(dir, users.username, users._id)}
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