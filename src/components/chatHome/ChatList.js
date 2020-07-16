import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChatList extends Component {
    state={
        searchList: "",
    }
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.id]:e.target.value
        });
    }
    render() {
        return (
            <div id="contactList" className="col l3 hide-on-small-only">
                <div className="input-field searchCont" style={{
                    color:"#259ee9"
                }}>
                    <i className="material-icons prefix">search</i>
                    <input type="text" name="searchList" id="searchList"
                        style={{
                            color:"white"
                        }}
                    />
                </div>
                <div className="divider"></div>
                <ul className="listing">
                    <li className="collection-item avatar">
                        <span 
                        className="btn btn-large btn-floating waves-effect waves-light"
                        >
                            AS
                        </span>
                        <Link to="#!" className="title center-align">Aajinkya</Link>
                        <div className="center-align chip">
                            Online 
                        </div>
                    </li>
                
                </ul>
            </div>
        )
    }
}

export default ChatList
