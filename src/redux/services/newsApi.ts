import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { GetNews } from '../interfaces';
import type { HeaderType, NewsCryptoType } from '../types';

type GetNewsParams = {
    count: number, 
    newsCategory: string, 
    textDecoration: boolean
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const headers:HeaderType = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '2a9fbebf38mshd3e25e5aad041bap1395d4jsnf11939b34807'
  }

const createRequest = (url: string): {url: string, headers: HeaderType} =>({
    url: url,
    headers: headers
})

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query<GetNews<NewsCryptoType[]>, GetNewsParams>({
            query: (
                {count, newsCategory, textDecoration}:GetNewsParams
            ) =>  createRequest(`/news/search?q=${newsCategory}&count=${count}&textDecorations=${textDecoration}&sortBy=Date&freshness=Day&textFormat=Raw&safeSearch=Off`)
        })
    })
})

export const {useGetCryptoNewsQuery} = newsApi