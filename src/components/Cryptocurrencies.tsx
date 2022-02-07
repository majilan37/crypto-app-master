import millify from 'millify';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useGetCoinsInfoQuery } from '../redux/services/cryptoApi';
import { CoinsInfo } from '../redux/types';
import Spinner from './Spinner';

export interface ICryptocurrenciesProps {
    simplified?: boolean;
}

export default function Cryptocurrencies ({simplified}: ICryptocurrenciesProps) {
    const {data: coinsInfo, isLoading} = useGetCoinsInfoQuery(simplified ? 10 : undefined);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [newCryptoInfo, setNewCryptoInfo] = useState<CoinsInfo[]>()
    const navigate:NavigateFunction = useNavigate()
    const onSearchTermChange = useCallback(
        (e:ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)
        , [searchTerm] 
    )
    useEffect(() => {
        if(!isLoading) {
            const filterData: CoinsInfo[] = coinsInfo!.data!.coins.filter(
            (coin) => 
                coin.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
            setNewCryptoInfo(filterData)
        }
    }, [searchTerm, coinsInfo])
    return (
        <>
            {simplified && (
                <div className="flex items-center justify-between ">
                    <h1 className='text-3xl font-semibold my-4'>Top 10 Cryptocurrencies in the World</h1>
                    <Link to='/cryptocurrencies' className='text-xl font-medium text-blue-400' >Show More</Link>
                </div>
            )}
                {!simplified && (
                    <div className="flex items-center justify-center my-5 flex-grow">
                        <input 
                            className="border border-gray-300 outline-none flex-grow max-w-xs py-2 px-4" 
                            placeholder="Search coin" 
                            type="text" 
                            value={searchTerm}
                            onChange={onSearchTermChange}
                        />
                    </div>
                )}
            <div className="flex flex-wrap justify-center px-6">  
                <div className="flex flex-wrap justify-center">
                    {isLoading ? new Array(10).fill(10).map((_, i) => (
                        <div className="bg-white border shadow-sm w-52 flex justify-center h-56 items-center py-3 mr-9 mb-5 p-6">
                            <Spinner key={i} loading={isLoading} /> 
                        </div>
                    )) : (
                    <>
                        {newCryptoInfo?.map((coin) => (
                            <div onClick={() => navigate(`/cryptocurrencies/${coin.uuid}`)} key={coin.uuid} className="bg-white border shadow-sm w-52 py-3 mr-9 mb-5 cursor-pointer transition-all duration-100 hover:shadow-lg">
                                <div className="flex items-center justify-between pt-2 pb-4 px-4 border-b">
                                    <p>{coin.rank}, {coin.name} </p>
                                    <img className="object-contain h-6" src={coin.iconUrl} alt="" />
                                </div>
                                <div className="px-4 py-4 space-y-4">
                                    <p>Price: {millify(Number(coin.price))}</p>
                                    <p>Market Cap: {millify(Number(coin.marketCap))}</p>
                                    <p>Change: {millify(Number(coin.change))}</p>
                                </div>
                            </div>
                        ))}
                    </>
                    )}
                </div>
            </div>
        </>
    );
}
