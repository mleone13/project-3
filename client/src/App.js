import logo from './logo.svg';
import './App.css';
// import { QUERY_ME } from './utils/queries'
// import { useQuery, useMutation, useLazyQuery} from '@apollo/client'
// import { ADD_USER } from './utils/mutations';
function App() {
  // const {loading, data} = useQuery(QUERY_ME)// onpage load
  // const [addUser, {error}] = useMutation(ADD_USER)// returns a function you can call at anytime
  // const [queryMe, additionalInfo] = useLazyQuery(QUERY_ME)// returns a function you can call at anytime
  // addUser("Daniel","daniel@email.com", "123abc", "www.somewhere.com", 23, "Coding is fun")
  // queryMe()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
