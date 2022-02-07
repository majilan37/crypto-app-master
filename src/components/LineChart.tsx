import { GetCoinHistory, GetCoinDetails } from '../redux/interfaces';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js'
import { CoinDetailsType } from '../redux/types';
import millify from 'millify';
import { useEffect, useLayoutEffect } from 'react';
import { Line } from 'react-chartjs-2';

export interface ILineChartProps {
  cryptoDetails: GetCoinDetails<CoinDetailsType> | undefined
  coinHistory: GetCoinHistory | undefined;
  timePeriod: string;
  isFetching: boolean;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function LineChart ({cryptoDetails, coinHistory, timePeriod, isFetching}: ILineChartProps) {

  const coinPrice = []
  const coinTimestamp = []
  const h = coinHistory

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data.history[i].price)
    coinTimestamp.push(new Date(coinHistory?.data.history[i].timestamp*1000).toLocaleDateString())
  }


    const data = {
      labels: coinTimestamp,
      datasets: [
        {
          label: 'Price in USD', 
          data: coinPrice, 
          fill: false, 
          backgroundColor: '#0071bd', 
          borderColor: '#0071bd'
        },
      ]
    }

    const options:any = {
      scales: {
        yAxes: [
          {
            ticks:{
              beginAtZero: true
            }
          }
        ]
      },
      responsive: true,
    }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{cryptoDetails?.data.coin.name} Price Chart</h2>
        <div className="font-bold text-xl ">
            <p>{coinHistory?.data.change}</p>
            <p> Current {cryptoDetails?.data.coin.name} Price: {`${cryptoDetails && millify(Number(cryptoDetails?.data.coin.price))}`} </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <Line data={data} options={options} />
      </div>
    </div> 
  );
}

export default LineChart