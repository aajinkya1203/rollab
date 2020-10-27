import React, { Component } from 'react';
import Cover from './CoverSignup';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { signupQuery } from '../../query/queries';
import M from 'materialize-css';
import Navbar from '../layout/Header';


class SignUp extends Component {
    state={
        name:"",
        email:"",
        password:"",
        cnfPassword:"",
    }
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.id]:e.target.value,
        })
    }
    handleSubmit = async (e)=>{
        document.querySelector('.progress').style.display = "block";
        e.preventDefault();
        if(this.state.password !== this.state.cnfPassword){
            M.toast({html: "Oh! Hold your horses. Those passwords don't match!"})
            return;
        }
        let res = await this.props.signupQuery({
            variables: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
        });
        if(res.data.addUser){
            M.toast({html: "Wohoo! You're in...Log in to get in ヽ(•‿•)ノ"});
            this.props.history.push("/login");
        }
        else{
            M.toast({html: "Oopsie! Something went wrong!"})
        }
    }
    render() {
        if(localStorage.getItem('token')){
            this.props.history.push('/chat');
        };
        return (
            <>
            <Navbar />
            <div style={{
                backgroundColor:"#292b2c",
                height: "114vh"
            }}>
                <Cover />
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
                            Create an account now!
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
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" 
                                onChange = { this.handleChange } required
                                />
                            </div>

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
                                <label htmlFor="cnfPassword">Confirm Password</label>
                                <input type="password" id="cnfPassword" name="cnfPassword" 
                                onChange = { this.handleChange } required
                                />
                            </div>
                            <div className="input-field">
                                <button className="btn" 
                                type="submit" name="action">Register
                                <i className="material-icons right">person</i>
                                </button> 
                                <div className="progress" style={{
                                    width:"90%",
                                    margin:"0 auto",
                                    marginTop:"20px",
                                    display:"none"
                                }}>
                                    <div className="indeterminate" style={{backgroundColor: "#ee6e73"}}></div>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="card-action" style={{
                            borderRadius:"0 0 0 24px"
                        }}>
                            <div className="switcher">
                            <Link to='/login' style={{
                                color:"#373a3d"
                            }}>
                                Already have an account?
                            </Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
            </>
        )
    }
}

export default compose(
    graphql(signupQuery, { name: 'signupQuery' }),
)(SignUp)
