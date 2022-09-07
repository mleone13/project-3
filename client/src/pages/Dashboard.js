import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer"
import { useCookies } from "react-cookie";


const Dashboard = () => {

    const character = [
        {
          name: 'Max',
          age: '2 Years of Age',
          aboutme: 'Young, Wild, and Free',
          url: 'https://i.imgur.com/HfAuR39.png'
        },
        {
          name: 'Tammy',
          age: '3 Years of Age',
          aboutme: 'Older & Wiser!',
          url: 'https://www.pexels.com/search/dog/'
        },
        {
          name: 'Frank',
          age: '1 Year of Age',
          aboutme: 'Looking for Love and Puppy Chow!',
          url: 'https://www.pexels.com/search/dog/'
        },
        {
          name: 'Mini',
          age: '2 Years of Age',
          aboutme: 'Young and Full of Energy!',
          url: 'https://www.pexels.com/search/dog/'
        },
        {
          name: 'Zach',
          age: '3 Years of Age',
          aboutme: 'I am a distinguished pup that enjoys long walks!',
          url: 'https://i.imgur.com/HfAuR39.png'
        }
      ]


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
            <div className= "swiper-container">
                <div className="card-container">

        {character.map((character) =>
          <TinderCard 
          className='swipe' key={character.name}
          onSwipe={(dir) => swiped(dir, character.name, character.age, character.aboutme)} 
          onCardLeftScreen={() => outOfFrame(character.name, character.age, character.aboutme)}> 
          <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
            className='card'>
              <h3>{character.name}</h3>
              <h4>{character.age}</h4>
              <h5>{character.aboutme}</h5>

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