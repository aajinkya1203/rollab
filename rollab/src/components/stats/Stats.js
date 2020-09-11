import React from 'react';
import {Line} from 'react-chartjs-2';

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
    return (
        <div>
            <Line
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
                    }
                }}
            />
        </div>
    )
}

export default Stats
