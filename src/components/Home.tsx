import {useGetCoinsInfoQuery} from '../redux/services/cryptoApi'
import millify from 'millify';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { useGetCryptoNewsQuery } from '../redux/services/newsApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

export interface GetCoinsInfoProps {
  title: string;
  data: string | number | undefined;
};

const GetCoinsInfo:React.FC<GetCoinsInfoProps> = ({title, data}): JSX.Element => {
  return (
    <div className="mb-3">
      <p className="text-lg font-thin text-gray-600">{title}</p>
      <h1 className="text-2xl font-semibold">{data && millify(Number(data))}</h1>
    </div>
  )
}

 function Home() {
   const {data: coinsInfo, isLoading} = useGetCoinsInfoQuery(10)
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className=" p-5">
        <h1 className="text-3xl font-semibold mb-4">Global Crypto Stats</h1>
        <div className=" flex justify-between">
          <div className="">
            {isLoading ? new Array(3).fill(3).map(() => (
              <Spinner loading={isLoading} /> 
            )) : (
              <>
                <GetCoinsInfo title='Total Cryptocurrencies' data={coinsInfo?.data.stats.total} />
                <GetCoinsInfo title='Total 24h Volume' data={coinsInfo?.data.stats.total24hVolume} />
                <GetCoinsInfo title='Total Coins' data={coinsInfo?.data.stats.totalCoins} />
              </>
            )}
          </div>
          <div className="">
            {isLoading ? new Array(3).fill(3).map(() => 
              <Spinner loading={isLoading} /> 
            ) : (
              <>
                <GetCoinsInfo title='Total Exchange' data={coinsInfo?.data.stats.totalExchanges} />
                <GetCoinsInfo title='Total Market Cap' data={coinsInfo?.data.stats.totalMarketCap} />
                <GetCoinsInfo title='Total Markets' data={coinsInfo?.data.stats.totalMarkets} />
              </>
            )}
          </div>
        </div>
        <Cryptocurrencies simplified />
        <News simplified />
      </div>
    </div>
  );
}

export default Home