
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import './App.css';
import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';

import Login from './components/login/Login';
import { useStateValue } from './reducer/StateProvider';
function App() {

const [{user},dispatch] = useStateValue();


  return (
    <div className="app">
      {!user ?(<Login/>):(
        <div className="app__body">
        <Router>
        <Sidebar/>
          <Switch>
        <Route path="/rooms/:roomId">
      <Chat/>
         </Route>
          <Route path="/">
          </Route>
          </Switch>
        </Router>
     
        </div>
      )}
      
    </div>
  );
}

export default App;
