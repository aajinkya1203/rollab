import React from 'react';
import './index.css';
import Home from './components/dashboard/home';
import Signin from './components/auth/signin';
import SignUp from './components/auth/signup';
import Test from './components/test';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/navbar'
import ChatHome from './components/chatHome/ChatHome';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/logout' component={ Home } />
        <Route path='/login' component={ Signin } />
        <Route path='/sign-up' component={ SignUp } />
        <Route path='/chat' component={ ChatHome } />
      </Switch>
    </>
  );
}

export default App;
