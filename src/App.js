import React from 'react';
import './App.css';

import {Home} from './components/Home'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import Farm from './components/Farm'
import AccountDetails from './components/AccountDetails'
import Pet from './components/Pet.js'

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
          <Route path='/farm' element={<Farm/>}/>          
          <Route path='/account-details' element={<AccountDetails/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
