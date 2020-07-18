import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar=()=> {
    return (
        <div className="sidebar col m1 l1 hide-on-small-only">
            <ul>
                <li>
                    <NavLink to="/" activeClassName="roundy" 
                        className="btn btn-floating waves-effect waves-light z-depth-0 btn-large"
                    >
                        <h5>r</h5>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="#!" activeClassName="roundy"
                        className="btn btn-floating waves-effect waves-light z-depth-0 btn-large"
                    >
                        <i className="material-icons">search</i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chat/contacts" activeClassName="roundy"
                        className="btn btn-floating waves-effect waves-light z-depth-0 btn-large"
                    >
                        <i className="material-icons">chat_bubble_outline</i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chat/groups" activeClassName="roundy"
                        className="btn btn-floating waves-effect waves-light z-depth-0 btn-large"
                    >
                        <i className="material-icons">group</i>
                    </NavLink>
                </li>
            </ul>
            <ul className="down">
                <li>
                    <NavLink to="#!" activeClassName="roundy"
                        className="btn btn-floating waves-effect waves-light z-depth-0 btn-large"
                    >
                        AS
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
