import React, { useEffect } from 'react';
import M from 'materialize-css';
import { myAllContacts, allMyGroups } from '../../query/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import SendButton from '../svgs/SendButton';
import { createGroup } from '../../query/queries'


const NewGroup = (props) => {
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('select').formSelect();
          });
    });

    // onSUbmit func
    const handleSubmit = async (e) => {
        console.log("not happ")
        e.preventDefault();
        if((window.$('#mySelect').val()).length == 0){
            M.toast({html: "Slow down partner! Add some friends to the party!"})
        }else{
            let selected = window.$('#mySelect').val();
            let name = document.querySelector('#groupName').value;
            let admin = localStorage.getItem("id")
            let members = [...selected, admin]
            let testRes = await props.createGroup({
                variables:{
                    name: name,
                    admin: admin,
                    members,
                },
                refetchQueries: [{ query: allMyGroups , variables:{
                    id: localStorage.getItem("id"),
                } }]
            })
            document.querySelector('.Sendbutton').dispatchEvent(new CustomEvent("happen"));
            document.querySelector('#groupName').value = "";

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
        <div id="modal2" className="modal">
            <div className="modal-content" style={{height:"100%"}}>
                <div className="BannerWrapper" style={{height:"100%"}}>
                </div>
                <span id="popMoto">No matter how silly they are, they are important!</span>
                <div style={{height:"75px"}}>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field col s8 offset-s2 inline white-text">
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
)(NewGroup)
