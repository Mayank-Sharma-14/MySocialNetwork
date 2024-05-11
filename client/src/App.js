import './App.css';
import Navbar from './Component/Navbar';
import {BrowserRouter,Route, Routes,useNavigate} from 'react-router-dom'
import Home from './Component/Screen/Home';
import Profile from './Component/Screen/Profile';
import SubscribedUser from './Component/Screen/SubscribedUser';
import Signup from './Component/Screen/Signup';
import Login from './Component/Screen/Login';
import { CreatePost } from './Component/Screen/CreatePost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './Reducers/UserReducers';
import UserProfile from './Component/Screen/UserProfile';

export const userContext = createContext()

const Routing=()=>{
  const navigates = useNavigate()
  const {state,dispatch} = useContext(userContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})    }
    else{
      navigates("/login")
    }
  },[])
  return(
    <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/login' Component={Login}/>
        <Route exact path='/profile' Component={Profile}/>
        <Route path='/createpost' Component={CreatePost}/>
        <Route path='/profile/:id' Component={UserProfile}/>
        <Route path='/myfollowers' Component={SubscribedUser}/>
      </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <userContext.Provider value = {{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
