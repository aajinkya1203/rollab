import React, { useEffect } from 'react';
import M from 'materialize-css';
import { myAllContacts } from '../../query/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import SendButton from '../svgs/SendButton';
import { createGroup } from '../../query/queries'


const Share = (props) => {
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('select').formSelect();
          });
    });

    // onSUbmit func
    const handleSubmit = async (e) => {
        e.preventDefault();
        if((window.$('#mySelect').val()).length === 0){
            M.toast({html: "Slow down partner! Add some friends to the party!"})
        }else{
            let selected = window.$('#mySelect').val();
            props.share(selected)
           
            document.querySelector('.Sendbutton').dispatchEvent(new CustomEvent("happen"));

            // resets dropdown
            var select = window.$('select');
            window.$("form input").val("");
            select.val("None");
            select.formSelect();

            setTimeout(() => {
                window.$('.modal').modal('close');
            }, 4000);

        }
    }

    return (
        <div id="modal3" className="modal">
            <div className="modal-content" style={{height:"100%", padding:"0"}}>
                <div className="ShareBannerWrapper" style={{height:"100%"}}>
                </div>
                <span id="popMotoShare">Because everyone needs a squad!</span>
                <div style={{height:"75px"}}>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="input-field col s8 offset-s2 white-text">
                            <select multiple id="mySelect">
                                <option value="" disabled>Gather your squad</option>
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
                            <SendButton />    
                        </div>
                        
                    </form>

                </div>
            </div>
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
    }),
    graphql(createGroup, { name: "createGroup" })
)(Share)
