import React, { useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import Sidebar from '../chatHome/Sidebar';
import Navbar from '../layout/Header';
import { animateScroll } from 'react-scroll';
import Weather from './Weather';
import Frequency from './Frequency';

const state = {
  labels: ['Monday', 'Tuesday', 'Wednesday',
           'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Active',
      fill: true,
      lineTension: 0.5,
      backgroundColor: '#ff3c57a8',
      borderColor: '#ff3c57',
      borderWidth: 1,
      data: [65, 59, 70, 81, 56, 61, 70]
    }
  ]
}

const Stats = (props) => {
    useEffect(() => {
        animateScroll.scrollToBottom();
    })
    return (
        <>
            <Navbar props={props} />
            <div id="stati" className="row"> 
                <Sidebar/>
                <div className="chart col s12 m10">
                    <h3 className="white-text col s12 left">
                        Your Statistics
                    </h3>
                    <div className="divider"></div>
                    <div className="col s12 m7">
                        <Line
                            id="lineChart"
                            data={state}
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
                    </div>
                    <Weather />
                    <Frequency />
                </div>
            </div>
        </>
    )
}

export default Stats
