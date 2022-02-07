import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { GetCoins, GetCoinDetails, GetCoinHistory } from '../interfaces';
import type {CoinsInfo, HeaderType} from '../types'
import { CoinDetailsType } from '../types';

const headers:HeaderType = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '2a9fbebf38mshd3e25e5aad041bap1395d4jsnf11939b34807'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url: string): {url: string, headers: HeaderType} =>({
    url: url,
    headers: headers
})

type ParamsType = {id: string | undefined, timePeriod: string}

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCoinsInfo: builder.query<GetCoins<CoinsInfo[]>, number | void>({
            query: (limit) => createRequest(`/coins${limit ? `?limit=${limit}` : ''}`)
        }),
        getCoinDetails: builder.query<GetCoinDetails<CoinDetailsType>, ParamsType>({
            query: ({id, timePeriod}) => createRequest(`/coin/${id}?timePeriod=${timePeriod}`)
        }),
        getCoinHistory: builder.query<GetCoinHistory, ParamsType>({
            query: ({id, timePeriod}) => createRequest(`/coin/${id}/history?timePeriod=${timePeriod}`)
        })
    })
})

export const {useGetCoinsInfoQuery, useGetCoinDetailsQuery, useGetCoinHistoryQuery} = cryptoApi