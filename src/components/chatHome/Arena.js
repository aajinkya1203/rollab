import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { userDetails } from '../../query/queries';

class Arena extends Component {
    state={
        message:""
    }
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.id]:e.target.value
        });
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        console.log(this.props  )
        return(
            <>
            {
                this.props.props.location.pathname === '/chat' || 
                this.props.props.location.pathname === '/chat/groups'
                ? (
                    <div>
                        Click any contact to start chatting...
                    </div>
                ) : (
                    this.props.data.user ? (
                        <div className="arena col s12 m7 l8" key={this.props.data.user.id}>
                            <div className="info">
                                <span 
                                className="btn btn-large btn-floating waves-effect waves-light"
                                    style={{
                                        backgroundColor:"#259ee9"
                                    }}
                                >
                                    {this.props.data.user.name[0]}
                                </span>
                                <h5 className="person center-align">
                                    {
                                        this.props.props.location.pathname === "/chat/groups" ? "VAMS" : this.props.data.user.name
                                    }
                                </h5>
                            </div>
                            <div className="divider"></div>
                
                            <div className="editor col s11 m7 l8">
                                <div className="input-field inline" onSubmit={this.handleSubmit}>
                                    <input type="text" name="message" id="message" 
                                    placeholder="Type something..."
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <a className="btn-floating prefix waves-effect waves-light" href="#!"
                                    onClick={this.handleSubmit}
                                    style={{
                                        backgroundColor:"#259ee9",
                                    }}
                                >
                                    <i className="material-icons">send</i>
                                </a>
                            </div>
            
                            <div className="chats col s11 m7 l8">
                                <ul id="chatListWrapper">
                                    {
                                        (this.props.data.user.messages.convos).length !== 0 ? (
                                            this.props.data.user.messages.convos.map(ele=>{
                                                return(
                                                    <div className="container">
                                                        <div className="left-align chip User">
                                                            {ele.sender.name}
                                                        </div>
                                                        <div className="message">
                                                            {ele.text}
                                                        </div>
                                                        <div className="time right-align">
                                                            <i>{ele.time}</i>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div>
                                                No messages yet
                                            </div>
                                        )
                                    }
                                    
                                    
                                </ul>
                            </div>

                        </div>                    
                    ) : (
                        <div>
                            Click any contact to start chatting...
                        </div>
                    )
                )
            }
            </>
        )
    }
}

export default graphql(userDetails,{
    options: (props)=>{
        return{
            variables:{
                id: props.props.match.params.id
            }
        }
    }
})(Arena)
