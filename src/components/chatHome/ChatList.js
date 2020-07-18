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
            <div id="contactList" className="col m3 l3 hide-on-small-only">
                <div className="input-field searchCont" style={{
                    color:"#259ee9"
                }}>
                    <i className="material-icons prefix" style={{
                        paddingTop:"5px"
                    }}>search</i>
                    <input type="text" name="searchList" id="searchList"
                        style={{
                            color:"white"
                        }}
                        placeholder="Search amongst your contacts..."
                        onChange={this.handleChange}
                    />
                </div>
                <div className="divider"></div>
                <fieldset>
                    <legend>{
                        this.props.props.location.pathname == "/chat/groups" ? "GROUPS" : "CONTACTS"
                    }</legend>
                    <ul className="listing">
                        <li className="collection-item avatar truncate">
                            <span 
                            className="btn btn-floating waves-effect waves-light"
                            >
                                AS
                            </span>
                            <Link to="#!" className="title center-align">Aajinkya</Link>
                            <div className="center-align chip">
                                Online 
                            </div>
                        </li>
                    </ul>
                </fieldset>
            </div>
        )
    }
}

export default ChatList
