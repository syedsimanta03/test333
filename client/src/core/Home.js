import React from 'react';
import Signin from '../user/Signin';
import {  isAuthenticate } from '../auth'

const Home = () => (
  <div>
    <div className='jumbotron'>
      <h2>Home</h2>
      <p className='lead'>Welcome to this site!</p>
      <div className='container'>
        <div className='card'>
          {!isAuthenticate() && <Signin />}
        </div>
      </div>
    </div>
  </div>
)

export default Home;
