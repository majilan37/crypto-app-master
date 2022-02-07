import { CoinsInfoStatsType } from "./types";

export interface GetCoins<Type> {
    status: string;
    data: {
        stats: CoinsInfoStatsType;
        coins: Type
    }
}

export interface GetNews<Type> {
    _type: string
    readLink: string;
    queryContext: object;
    totalEstimatedMatches:number;
    sort: Array<object>;
    value: Type
}

export interface GetCoinDetails<Type> {
    "status":string ;
    "data":{
        "coin": Type
    }
}

export interface GetCoinHistory {
    "status":"success"
    // "data":{
    // "change": string;
    // "history": Array<{
    //     "price": string  
    //     "timestamp":number
    //     }>
    // },
    "data":any
}