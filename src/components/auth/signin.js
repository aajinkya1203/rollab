import React, { Component } from 'react'
import Carding from './CoverSignin';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { loginQuery } from '../../query/queries';
import M from 'materialize-css';


class signin extends Component {
  state = {
    email : "",
    password : "",
  }

  handleChange=(e)=>{
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
  handleSubmit = async (e)=>{
    e.preventDefault();
    let res = await this.props.loginQuery({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    });
    if(res.data){
      M.toast({html: "Ayy! You're in. (~˘▾˘)~"})
      localStorage.setItem('token', res.data.login.token);
      localStorage.setItem('user', JSON.stringify(res.data.login));
      this.props.history.push('/chat');
    }else{
      M.toast({html: "Oopsie! Something went wrong!"})
    }
  }

  render() {
    if(localStorage.getItem('token')){
      this.props.history.push('/chat');
    };
    return (
      <div>
        <Carding />
        <div className="row signing">
          <div className="col s12 m10 offset-m1 l5 offset-l6" style={{
            borderRadius:"24px 0 0 0",
            zIndex: 8,
            display:"grid",
            opacity: 1,
          }} >
            <div className="card panel" style={{
              borderRadius:"24px 0 0 0",
            }}       
            >
              <h4>
                Sign In to join the party!
              </h4>
            </div>
          </div>
          <div className="col s12 m10 offset-m1 l5 offset-l6">
            <div className="card" style={{
              borderRadius:"0 0 0 24px"
            }}>
              <div className="card-content">

                <form onSubmit={ this.handleSubmit }>

                  <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" 
                      onChange = { this.handleChange } required
                    />
                  </div>

                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" 
                      onChange = { this.handleChange } required
                    />
                  </div>
                  <div className="input-field">
                    <button className="btn waves-effect waves-light" 
                      type="submit" name="action">Log In
                      <i className="material-icons right">send</i>
                    </button> 
                  </div>
                </form>
              </div>
              <div className="card-action" style={{
                borderRadius:"0 0 0 24px"
              }}>
                <div className="switcher">
                  <Link to='/sign-up'>
                    Don't have an account?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(loginQuery, { name: 'loginQuery' }),
)(signin);

