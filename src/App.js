import React from 'react';
import './index.css';
import Home from './components/dashboard/home';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/navbar'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route to='/' component={Home} />
      </Switch>
    </>
  );
}

export default App;
