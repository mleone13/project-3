import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer"
import { useCookies } from "react-cookie";


const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId

    const character = [
        {
          name: 'Max',
          url: 'https://i.imgur.com/HfAuR39.png'
        },
        {
          name: 'Tammy',
          url: 'https://www.pexels.com/search/dog/'
        },
        {
          name: 'Frank',
          url: 'https://www.pexels.com/search/dog/'
        },
        {
          name: 'Mini',
          url: 'https://www.pexels.com/search/dog/'
        },
        {
          name: 'Zach',
          url: 'https://i.imgur.com/HfAuR39.png'
        }
      ]



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
          onSwipe={(dir) => swiped(dir, character.name)} 
          onCardLeftScreen={() => outOfFrame(character.name)}>
          <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
            className='card'>
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