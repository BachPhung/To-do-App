import { useContext , useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

import TodoPage from './pages/TodoPage';
import AuthContext from './store/auth-context';


function App() {
  const authCtx = useContext(AuthContext);
  const [userID, setUserID] = useState('');
  const [userToken,setUserToken] = useState('');
  const [user, setUser] = useState();
  

  return (
    
    
        <Layout>
           {authCtx.isLoggedIn && <p> Hello {user}</p>}
          <Switch>
          
            <Route path='/' exact>
              <HomePage checkAuth={user} />
            </Route>
            {!authCtx.isLoggedIn && (
              <Route path='/auth'>
                <AuthPage setUserID = {setUserID} setUserToken={setUserToken} setUser = {setUser} />
              </Route>
            )}
            {authCtx.isLoggedIn && (
                <Route path='/profile'>
                  <UserProfile userID = {userID}></UserProfile>
                {/*authCtx.isLoggedIn && <UserProfile userID = {userID} />*/}
                {/*!authCtx.isLoggedIn && <Redirect to='/auth' />*/}
              </Route>
            )}
            
    
            {authCtx.isLoggedIn && (
              <Route path='/notes'>
              <TodoPage userID = {userID} userToken={userToken}  user = {user}/>
            </Route>
            )}
    
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Layout>
      
    
  );
}

export default App;


