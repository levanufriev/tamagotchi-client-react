import React from 'react';
import './App.css';

import {Home} from './components/Home'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import FarmsOverview from './components/FarmsOverview'
import AccountDetails from './components/AccountDetails'
import FarmDetails from './components/FarmDetails'
import Pet from './components/Pet'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>         
          <Route path='/account-details' element={<AccountDetails/>}/>
          <Route path='/farms-overview' element={<FarmsOverview/>}/>
          <Route path='/farm-details' element={<FarmDetails/>}/>
          <Route path='/pets' element={<Pet/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
