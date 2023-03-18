import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";

import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

import { Search_service } from "./pages/Services_page/Search_service";
import { Create_Service } from "./pages/Services_page/CreateService"

import { SubscriptioCreate } from "./pages/subscription_page/SubscriptionCreate";
import { SubscriptioStatus } from "./pages/subscription_page/SubscriptionStatus";

import { Profile } from "./pages/profile/Profile";
import { ProfileUserOther } from "./pages/profile/ProfileUserOther";

import { ConnectionChatbetweenUserAB } from "./pages/chat/ConnectionChatbetweenUserAB";

import { Notes } from "./pages/Notes";


import './static/styles/App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />

          <Route path="/services" element={<Search_service />} />
          <Route path="/serviceCreate" element={<Create_Service />} />


          <Route path="/SubscriptioCreate" element={<SubscriptioCreate />} />
          <Route path="/SubscriptioStatus" element={<SubscriptioStatus />} />

          <Route path="/miPerfil" element={<Profile />} />
          <Route path="/perfilUser" element={<ProfileUserOther />} />

          <Route path="/Notes" element={<Notes />} />

          <Route path="/chat" element={<ConnectionChatbetweenUserAB />} />


          {/* <Route path="/service" element={<Error404 />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
