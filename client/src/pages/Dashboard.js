import TinderCard from "react-tinder-card";
import React, { useState, useEffect } from "react";
import ChatContainer from "../components/ChatContainer"
import { useCookies } from "react-cookie";
import { useQuery, gql } from "@apollo/client"
import { QUERY_USERS } from "../utils/queries";


const Dashboard = () => {
  const { loading, error, data } = useQuery(QUERY_USERS)

  useEffect(() => {
    console.log(data)
  }, [data])
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

          {/* {character.map((character) =>
            <TinderCard
              className='swipe' key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}>
              <div style={{ backgroundImage: 'url(' + character.url + ')' }}
                className='card'>
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          )} */}

          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard;