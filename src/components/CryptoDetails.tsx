import {
  BookmarkIcon, BriefcaseIcon, CheckCircleIcon, CurrencyDollarIcon, ExclamationCircleIcon, HashtagIcon, LightningBoltIcon, TrendingDownIcon, XCircleIcon 
} from "@heroicons/react/outline";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useCallback, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { useGetCoinDetailsQuery, useGetCoinHistoryQuery } from "../redux/services/cryptoApi";
import LineChart from "./LineChart";

export interface ICryptoDetailsProps {

}

export default function CryptoDetails ({}: ICryptoDetailsProps) {
    const { id }:Readonly<Params<string>> = useParams<string>()
    const [timePeriod, setTimePeriod] = useState('24h')
    const {data: cryptoDetails, isLoading} = useGetCoinDetailsQuery({id, timePeriod})
    const {data: coinHistory, isFetching, refetch} = useGetCoinHistoryQuery({id, timePeriod})
    const onTimePeriodChange = useCallback(
      (e:React.ChangeEvent<HTMLSelectElement>) => {
        setTimePeriod(e.target.value)
        refetch()
      }
      , [timePeriod]
    )
    console.log('Crypto Details =>', cryptoDetails);
    console.log('Crypto History =>', coinHistory);
    const times:Array<string> = ['3h', '7h', '24h', '7d', '30d', '3m', '6m', '1y', '3y', '5y']

 
    // if(isLoading) return 'Loading'
    const stats = [
      { title: 'Price to USD', value: `$ ${cryptoDetails?.data?.coin.price && millify(Number(cryptoDetails?.data?.coin.price))}`, icon: <CurrencyDollarIcon className='h-6' /> },
      { title: 'Rank', value: cryptoDetails?.data?.coin?.rank, icon: <HashtagIcon className='h-6' /> },
      { title: '24h Volume', value: `$ ${cryptoDetails?.data?.coin?.['24hVolume'] && millify(Number(cryptoDetails?.data?.coin?.['24hVolume']))}`, icon: <LightningBoltIcon className='h-6' /> },
      { title: 'Market Cap', value: `$ ${cryptoDetails?.data?.coin?.marketCap && millify(Number(cryptoDetails?.data?.coin?.marketCap))}`, icon: <CurrencyDollarIcon className='h-6' /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.data?.coin?.allTimeHigh?.price && millify(Number(cryptoDetails?.data?.coin?.allTimeHigh?.price))}`, icon: <TrendingDownIcon className='h-6' /> },
  ];
  
  const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails?.data?.coin.numberOfMarkets, icon: <BriefcaseIcon className='h-6' /> },
      { title: 'Number Of Exchanges', value: cryptoDetails?.data?.coin.numberOfExchanges, icon: <BookmarkIcon className='h-6' /> },
      { title: 'Aprroved Supply', value: cryptoDetails?.data?.coin.supply?.confirmed ? <CheckCircleIcon className='h-6' /> : <XCircleIcon className='h-6' />, icon: <ExclamationCircleIcon className='h-6' /> },
      { title: 'Total Supply', value: `$ ${cryptoDetails?.data?.coin.supply?.total && millify(Number(cryptoDetails?.data?.coin.supply?.total))}`, icon: <ExclamationCircleIcon className='h-6' /> },
      { title: 'Circulating Supply', value: `$ ${cryptoDetails?.data?.coin.supply?.circulating && millify(Number(cryptoDetails?.data?.coin.supply?.circulating))}`, icon: <ExclamationCircleIcon className='h-6' /> },
  ];

  return (
    <div className="px-4 py-6 w-full">
      <h1 className="text-4xl font-bold text-blue-700 text-center">{cryptoDetails?.data.coin.name} ({cryptoDetails?.data.coin.symbol}) Price </h1>
      <p className='text-center text-lg my-4' >{cryptoDetails?.data.coin.name} Live Price in USD, View value statistics, market cap and supply  </p>
      <hr />
      <div className="flex items-center my-5 flex-grow">
          <select value={timePeriod} onChange={onTimePeriodChange} className="border flex-grow border-gray-300 px-3 py-1 max-w-[200px] outline-none " name="" id="">
            <option value="">24h</option>
            {times.map((item, i) => (
              <option value={item} key={i}>{item}</option>
            ))}
          </select>
      </div>
      <div className="px-3">
        <LineChart 
          timePeriod={timePeriod}
          cryptoDetails={cryptoDetails}
          coinHistory={coinHistory}
          isFetching={isFetching}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between px-6 my-7">
        <div className="">
          <h2 className="text-3xl font-bold text-blue-900">{cryptoDetails?.data.coin.name} Value Statistics</h2>
          <p className="text-lg text-gray-500">An overview of the the stats of {cryptoDetails?.data.coin.name}</p>
          {stats.map((item, index) => (
            <div className="py-4 border-b max-w-xs">
              <div className="flex items-center space-x-2">
                <span>{item.icon}</span>
                <span>{item.title}</span>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <h2 className="text-3xl font-bold text-blue-900">Other Statistics</h2>
          <p className="text-lg text-gray-500">An overview of the the stats of all Crypto cryptocurrencies</p>
          {genericStats.map((item, index) => (
            <div key={index} className="py-4 border-b max-w-xs">
              <div className="flex items-center space-x-2">
                <span>{item.icon}</span>
                <span>{item.title}</span>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="max-w-xl">
          <p>What is {cryptoDetails?.data.coin.name} ?</p>
          {cryptoDetails && (
            <p className="text-gray-800 font-medium "> {HTMLReactParser(cryptoDetails!.data.coin.description)} </p>
          )}
        </div>
        <div className="flex flex-col justify-between">
          {cryptoDetails?.data.coin.links.map((link) => (
            <div className="flex bg-gray-50 py-4 px-2 justify-between ">
              <p className="text-xl text-blue-800 font-semibold">{link.name}</p>
              <a href={link.url} target="_blank" className="">
                <p className="text-lg text-blue-700">{link.url}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
