import React from 'react';
import './index.css';
import Home from './components/dashboard/home';
import Signin from './components/auth/signin';
import SignUp from './components/auth/signup';
import Landing from './components/game/landing';
import { Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import M from 'materialize-css';
import { motion } from 'framer-motion'
import Arena from './components/chatHome/Arena';
import Profile from './components/svgs/profile/Profile';
import Stats from './components/stats/Stats';
import StackedCards from './components/layout/StackedCards'
import News from './components/stats/News';
import BetaProfile from './components/svgs/profile/BetaProfile';
import Invite from './components/popups/Invite';
import DrawIO from './components/game/DrawIO/DrawIO';
import { Reacteroids as Spacey } from './components/game/Spacey/Reacteroids';
import Musly from './components/game/musly/musly'
import ChatBotUI from './components/chatHome/ChatBot/ChatBotUI';
import Notifications from './components/chatHome/ChatBot/Notifications';
import { animateScroll } from 'react-scroll';
import Delete from './components/popups/Delete';
import Single from './components/game/battleship/single-battle';




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
        className="floating"
        id="rFAB"
        onDoubleClick={()=>{
          document.querySelector("#rFAB").classList.remove("pulse")
          document.querySelector('#notifi').style.display = ""
          if(document.querySelector('#bodz').style.display == ""){
            document.querySelector('#bodz').style.display = "initial"
          }else{
            document.querySelector('#bodz').style.display = ""
          }
        }}
        onTap={()=>{
            animateScroll.scrollToBottom({
                containerId: "notifi"
            })
              document.querySelector("#rFAB").classList.remove("pulse")
              if(document.querySelector('#notifi').style.display == ""){
                if(document.querySelector('#bodz').style.display == ""){
                  document.querySelector('#notifi').style.display = "initial";
                }else{
                  
                }
              }else{
                document.querySelector('#bodz').style.display = "";
                document.querySelector('#notifi').style.display = "";
              }
        }}
      >
        R
      </motion.div>
      <ChatBotUI />
      <Notifications />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/logout' component={ Home } />
        <Route path='/login' component={ Signin } />
        <Route path='/sign-up' component={ SignUp } />
        <Route path='/stats' component={ Stats } />
        <Route path='/chat/groups/:gid' component={ Arena } />
        <Route path='/chat/groups' component={ Arena } />
        <Route path='/chat/:id' component={ Arena } />
        <Route exact path='/chat' component={ Arena } />
        <Route exact path='/profile' component={ Profile } />
        <Route exact path='/game/online' component={ StackedCards } />
        <Route exact path='/game/solo' component={ StackedCards } />
        <Route exact path='/game' component={ Landing } />
        <Route path='/news' component={ News } />
        <Route path='/beta' component={ BetaProfile } />
        <Route path='/invite' component={ Invite } />
        <Route path='/drawio/:rid' component={ DrawIO } />
        <Route path='/spacey' component={ Spacey } />
        <Route path='/musly' component={ Musly } />
        <Route path='/delete' component={ Delete } />
        <Route path='/solo/battleship' component={ Single } />
        {/* <Route path='/musly/:mlid' component={ GameHome } /> */}
      </Switch>
    </ApolloProvider>
  );
}

export default App;
