export type HeaderType = {
    'x-rapidapi-host': string,
    'x-rapidapi-key': string,
    'x-bingapis-sdk'?: string ,
}

export type CoinsInfoStatsType = {
    total: number | undefined
    total24hVolume: string | undefined
    totalCoins: number | undefined
    totalExchanges: number | undefined
    totalMarketCap: string | undefined
    totalMarkets: number | undefined
}

export type CoinsInfo = {
    "uuid": string
    "symbol":string
    "name":string
    "color":string
    "iconUrl": string
    "marketCap":string
    "price":string
    "listedAt":number
    "tier": number
    "change":string
    "rank":number
    "sparkline": string[]
    "lowVolume": boolean
    "coinrankingUrl":string
    "24hVolume":string
    "btcPrice":string
}

export type NewsCryptoType = {
    about: Array<{
        _type: string, 
        readLink: string, 
        name: string
    }>
    datePublished: string
    description: string
    image: {
         thumbnail:{
            contentUrl: string
            height: number
            width: number
            _type: string
         }
        _type: string
    }
    name: string
    provider: Array<{
        type: string, 
        name: string, 
        image: {
            _type: string,
            thumbnail: {
                contentUrl: string
                _type: string
            }
        }
    }>
    url: string
    _type: string
}

export type CoinDetailsType = {
    uuid:string
    symbol: string
    name:string
    description: string
    color:string
    iconUrl: string
    websiteUrl:string
    links: Array<{
        name:string
        type:string
        url:string
    }>
    supply:{
        confirmed:true
        total:string
        circulating:string
    }
    numberOfMarkets:number
    numberOfExchanges:number
    "24hVolume":string
    marketCap:string
    price:string
    btcPrice:string
    priceAt:number
    change:string
    rank: number
    sparkline:string[]
    allTimeHigh:{
        price:string
        timestamp:number
    }
    coinrankingUrl:string
    tier: number
    lowVolume:number
    listedAt:number
}