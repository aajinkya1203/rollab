import React, { Component } from 'react'

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
        return (
            <div className="arena col s12 m7 l8">
                <div className="info">
                    <span 
                    className="btn btn-large btn-floating waves-effect waves-light"
                        style={{
                            backgroundColor:"#259ee9"
                        }}
                    >
                        AS
                    </span>
                    <h5 className="person center-align">
                        {
                            this.props.props.location.pathname === "/chat/groups" ? "VAMS" : "Aajinkya"
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
                        <div className="container">
                            <div className="left-align chip User">
                                Aajinkya 
                            </div>
                            <div className="message">
                                Hello, what you upto?
                            </div>
                            <div className="time right-align">
                                <i>11:09 PM</i>
                            </div>
                        </div>
                        
                        
                    </ul>
                </div>


            </div>
        )
    }
}

export default Arena
