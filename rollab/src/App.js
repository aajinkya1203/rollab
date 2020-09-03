import React from 'react';
import './index.css';
import Home from './components/dashboard/home';
import Signin from './components/auth/signin';
import SignUp from './components/auth/signup';
import { Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import M from 'materialize-css';
import { motion } from 'framer-motion'
import Arena from './components/chatHome/Arena';
import Profile from './components/svgs/profile/Profile';



// setting up an apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1000/graphql',
  onError:({ response, operation,graphQLErrors,networkError }) => {
    if (operation.operationName === "IgnoreErrorsQuery") {
      response.errors = null;
    }
    if(graphQLErrors[0] && graphQLErrors[0].message){
      M.toast({ html: graphQLErrors[0].message })
    }
    if(networkError){
      M.toast({ html: "There seems to be an internet issue!"})
    }
    if(response?.errors){
      response.errors = null;
    }

  }
})

function App() {
  return (
    <ApolloProvider client={client}>
      {/* <Navbar /> */}
      <motion.div drag 
        dragConstraints={{ right:0, left: -80 ,top: 80, bottom: 300}}
      className="floating">
        R
      </motion.div>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/logout' component={ Home } />
        <Route path='/login' component={ Signin } />
        <Route path='/sign-up' component={ SignUp } />
        <Route path='/chat/groups/:gid' component={ Arena } />
        <Route path='/chat/groups' component={ Arena } />
        <Route path='/chat/:id' component={ Arena } />
        <Route exact path='/chat' component={ Arena } />
        <Route exact path='/profile' component={ Profile } />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
