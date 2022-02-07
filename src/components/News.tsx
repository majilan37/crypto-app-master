import moment from 'moment';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCoinsInfoQuery } from '../redux/services/cryptoApi';
import { useGetCryptoNewsQuery } from '../redux/services/newsApi';

export interface INewsProps {
  simplified?:boolean
}

export default function News ({simplified}: INewsProps) {
  const [newsCategory, setNewsCategory] = useState('cryptocurrencies')
  const {data: cryptoNews , isLoading} = useGetCryptoNewsQuery({count: simplified ? 5 : 60, newsCategory, textDecoration: true})
  const {data: cryptoInfo} = useGetCoinsInfoQuery()
  console.log(cryptoNews);
  const onSelectChange = useCallback(
    (e:React.ChangeEvent<HTMLSelectElement>) => setNewsCategory(e.target.value)
    ,[newsCategory]
  )
  console.log(newsCategory);
  return (
    <div className="p-5">
      {simplified && (
        <div className="flex items-center justify-between ">
          <h1 className='text-3xl font-semibold my-4'>News</h1>
          <Link to='/news' className='text-xl font-medium text-blue-400' >Show More</Link>
        </div>
      )}
      {!simplified && (
        <div className="">
          <select value={newsCategory} onChange={onSelectChange} className="border border-gray-300 px-3 py-1" name="" id="">
            <option value="">Cryptocurrencies</option>
            {cryptoInfo?.data.coins.map((coin) => (
              <option value={coin.name} >{coin.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="flex flex-wrap my-3">
        {cryptoNews?.value.map((news, index) => (
          <a href={news?.url} target="_blank" key={index} className="bg-white border shadow-sm py-3 mr-9 mb-5 cursor-pointer transition-all duration-100 hover:shadow-lg max-w-sm ">
            <div className="flex items-start justify-between pt-2 pb-4 px-4">
                <p className="pr-6 text-xl font-medium">{news?.name} </p>
                <img className="object-contain w-auto h-32" src={news?.image?.thumbnail?.contentUrl} alt="" />
            </div>
            <div className="px-4">
              <p>{news?.description}</p>
              <span className="text-xs text-gray-700">{moment(news.datePublished).fromNow()}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
