import React, { useEffect, useState } from 'react'
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import {Doughnut, Line, Polar} from 'react-chartjs-2';
import { getFreq } from '../../query/queries';



const Frequency = (props) => {
    const [freq, setFreq] = useState({labels: [], values: [], colors: []});
    useEffect(()=>{
        if(props.getFreq.loading === false){
            if(props.getFreq.user.messages.convos && props.getFreq.user.messages.convos.length !== 0){
                let v = [];
                let d = [];
                var colorsy = [];
                props.getFreq.user.messages.convos.map(convo=>{
                    d.push(convo["person"]["name"]);
                    v.push(convo["messages"].length);
                });
                for(var i = 0; i < v.length; ++i){
                    colorsy.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
                }
                setFreq({labels: [...d], values: [...v], colors: [...colorsy]});
            }
        }
    }, [props]);
    return (
        <>
            <div className="col s12">
                <div className="col s12 m5 valign-wrapper">
                    <div className="card-panel white-text" style={{height:"300px", backgroundColor:"#ff6384"}}>
                        <span className="white-text" style={{fontSize: "25px"}}>
                            Your interactivity!
                        </span>
                        <br />
                        <div className="divider white"></div>
                        <br />
                        Get a glimpse of who all you interact with, and how much!
                    </div>
                </div>
                <div className="col s12 m7 valign-wrapper">
                    {
                        freq.labels.length !== 0 ? (
                            <Doughnut
                                id="doughnut"
                                data = {{
                                    labels: [...freq.labels],
                                    datasets: [
                                        {
                                        label: 'Messages',
                                        fill: true,
                                        lineTension: 0.5,
                                        backgroundColor: [
                                            "#ffcd56",
                                            "#ff6384",
                                            "#36a2eb",
                                            "#4bc0c0",
                                            "#c9cbcf"
                                        ],
                                        borderColor: "#23272a",
                                        borderWidth: 1,
                                        data: [...freq.values]
                                        }
                                    ]
                                }}
                                options={{
                                    title:{
                                        display:false,
                                        // text:'Average Rainfall per month',
                                        // fontSize:20
                                    },
                                    legend:{
                                        display:false,
                                        position:'right'
                                    },
                                    tooltips: {
                                        mode: 'index',
                                        intersect: false
                                    },
                                    hover: {
                                        mode: 'index',
                                        intersect: false
                                    }
                                }}
                            />
                        ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default compose(
    graphql(getFreq, {
        name: "getFreq",
        options: (props) => {
            return {
                variables: {
                    id: localStorage.getItem("id")
                }
            }
        }
    })
)(Frequency)
