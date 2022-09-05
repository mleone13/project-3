import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer"
import { useCookies } from "react-cookie";
import axios from "axios";

const Dashboard = () => {

    const db = [
        {
          name: 'Richard Hendricks',
          img: './image'
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
        <div className="dashboard">
            <ChatContainer/>
            <div className= "swi-per-container">
                <div className="card-container">

        {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}

        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;