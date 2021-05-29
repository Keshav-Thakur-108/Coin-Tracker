import React, {useEffect, useState} from 'react'
import {Backdrop} from './Backdrop'
import {Line} from 'react-chartjs-2'
import axios from 'axios'
import moment from 'moment'
import './Modal.css'


const data = {
    labels: [],
    datasets: [
        {
        label: 'Price',
        data: [],
        fill: false,
        backgroundColor: 'rgb(217, 77, 38)',
        borderColor: 'rgb(217, 77, 38)',
        },
    ],
    };

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const Modal = (props) => {

    const [priceData, setPriceData] = useState({})

    useEffect(() => {
       data.labels = [];
       data.datasets[0].data = []
        axios.get(`https://api.coingecko.com/api/v3/coins/${props.coin}/market_chart?vs_currency=inr&days=7&interval=daily`)
        .then(res => {
           // eslint-disable-next-line array-callback-return
           res.data.prices.map(price => {
                
                const date = moment(price[0]).format('MMMM Do');
                data.labels.push(date)
                data.datasets[0].data.push(price[1])
            })
            setPriceData(data)
            
               
        })
     
    }, [props.coin])

 

    return (
        <>
        <Backdrop show={props.show} clicked={props.clicked}/>
        <div className="Modal">
            <Line data={priceData} options={options}/>
        </div>
        </>
    
    )
}
