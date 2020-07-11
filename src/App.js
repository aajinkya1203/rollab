import React from 'react';
import './index.css';
import Home from './components/dashboard/home';
import Signin from './components/auth/signin';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/navbar'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/login' component={ Signin } />
      </Switch>
    </>
  );
}

export default App;
