import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { userDetailWithMessages, sendMessage } from '../../query/queries';
import M from 'materialize-css';
import { flowRight as compose } from 'lodash';
import { animateScroll } from 'react-scroll';
import moment from 'moment';


class Arena extends Component {
    state={
        message:""
    }
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.id]:e.target.value
        });
    };

    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: "chatListWrapper"
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.message === ""){
            M.toast({html:"Slow down, partner. Write a message first."})   
        }else{
            let messageId = JSON.parse(localStorage.getItem('user')).messages.id
            await this.props.sendMessage({
                variables:{
                    text: this.state.message,
                    sender: localStorage.getItem('id'),
                    id: messageId,
                    person: this.props.data.user.id,
                    personId: this.props.data.user.message.id,
                    userId: localStorage.getItem('id')
                },
                refetchQueries: [ { query: userDetailWithMessages, variables: {
                    id: this.props.props.match.params.id,
                    profileId: localStorage.getItem("id")
                } } ]
            })
            this.setState({
                message: ""
            })
        }
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
                                    value={this.state.message}
                                    placeholder="Type something..."
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <a className="btn-floating prefix" href="#!"
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
                                        (this.props.data.loading) === false &&  this.props.data.user.message.convos ? 
                                         (
                                            this.props.data.user.message.convos.messages.map(ele=>{
                                                return(
                                                    <div className="container" key={Math.random()}>
                                                        <div className="left-align chip User">
                                                            {ele.sender.name}
                                                        </div>
                                                        <div className="message">
                                                            {ele.text}
                                                        </div>
                                                        <div className="time right-align">
                                                            <i>
                                                                { moment(parseInt(ele.time)).fromNow() }
                                                            </i>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div>
                                                No message yet
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

export default compose(
    graphql(userDetailWithMessages,{
        options: (props)=>{
            return{
                variables:{
                    id: props.props.match.params.id,
                    profileId: localStorage.getItem("id")
                }
            }
        }
    }),
    graphql(sendMessage, { name: "sendMessage" })
)(Arena)
