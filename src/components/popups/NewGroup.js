import React, { useEffect } from 'react';
import M from 'materialize-css';
import { myAllContacts } from '../../query/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';



const NewGroup = (props) => {
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('select').formSelect();
          });
    });

    // onSUbmit func
    const handleSubmit = (e) => {
        e.preventDefault();
        if((window.$('#mySelect').val()).length == 0){
            M.toast({html: "Slow down partner! Add some friends to the party!"})
        }else{
            console.log(window.$('#mySelect').val())
        }
    }

    console.log(props)
    return (
        <div id="modal2" className="modal">
            <div className="modal-content" style={{height:"100%"}}>
                <div className="BannerWrapper" style={{height:"100%"}}>
                </div>
                <span id="popMoto">No matter how silly they are, they are important!</span>
                <div style={{height:"75px"}}>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field col s8 offset-s2 inline white-text">
                            <label style={{paddingTop:"8px"}}>You can have any name you want, we wont judge!😉</label>
                            <input required placeholder="A fancy name for your group..." id="groupName" type="text" className="validate white-text"/>
                        </div>
                        <div className="input-field col s8 offset-s2 white-text">
                            <select multiple id="mySelect">
                                <option value="" disabled>Add your mates</option>
                                {
                                    props.data.loading === false && props.data.user && props.data.user.contacts ? (
                                        props.data.user.contacts.people.map(person => {
                                            return(
                                                <option value={person.id} key={person.id}>{person.name}</option>
                                            )
                                        })
                                    ) : null
                                }
                            </select>
                            <label>How about we add some mates now ?</label>
                        </div>
                        <div className="input-field col s4 offset-s4 center-align">
                            <button className="btn-flat makeGroup" type="submit" onSubmit={handleSubmit}>CREATE</button>
                        </div>
                        
                    </form>

                </div>
            </div>
            {/* <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div> */}
        </div>
    )
}

export default compose(
    graphql(myAllContacts,{
        options: (props)=>{
            return{
                variables:{
                    id: localStorage.getItem("id")
                },
            }
        }
    })
)(NewGroup)
