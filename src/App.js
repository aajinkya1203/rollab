import React from 'react';
import './index.css';
import Home from './components/dashboard/home';
import Signin from './components/auth/signin';
import SignUp from './components/auth/signup';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/navbar'
import ChatHome from './components/chatHome/ChatHome';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// setting up an apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1000/graphql',
  onError:({ response, operation }) => {
    console.log(operation)
    if (operation.operationName === "IgnoreErrorsQuery") {
      response.errors = null;
    }
    response.errors = null;

  }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/logout' component={ Home } />
        <Route path='/login' component={ Signin } />
        <Route path='/sign-up' component={ SignUp } />
        <Route path='/chat' component={ ChatHome } />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
