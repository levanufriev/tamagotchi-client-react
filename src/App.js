import React from 'react';
import './App.css';

import {Home} from './components/Home'
import {Navigation} from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import Farm from './components/Farm'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="container">

        
      <Navigation/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/farm' element={<Farm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
