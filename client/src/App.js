import React from "react";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/seller/profile/Profile";
import SignUpLogin from "./components/register-login/SignUpLogin";
import EditProfiles from "./components/seller/editProfile/EditProfiles";
import { useSelector } from "react-redux";

function App() {
  const {user} = useSelector(state=>state.user)
  console.log(user)
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={user ? <Home /> : <SignUpLogin />} /> 

        <Route path="/signuplogin" element={!user ? <SignUpLogin /> : <Home /> } />
         
          <Route path="/profile/:userid" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfiles />} /> 
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
