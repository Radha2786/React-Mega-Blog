import  React, { useEffect, useState } from "react"
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth"
import './App.css'
import { login, logout } from "./store/authSlice";
import { Header , Footer} from "./components";
import { Outlet } from "react-router-dom";

function App() {
  // console.log (import.meta.env.VITE_APPWRITE_URL); 
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userdata) => {
      if(userdata){
        dispatch(login(userdata));
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false));
  },[]);


return !loading ? (
  
  <div className="min-h-screen flex flex-wrap content-between bg-fuchsia-100">
    <div className="w-full block">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>

    </div>
  </div>
  
) : <h1>Loading...</h1>
}

export default App

// jese hi app load ho rha hai to dekhna padega ki user logged in h ya ni hai
