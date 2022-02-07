import { configureStore } from '@reduxjs/toolkit';
import {cryptoApi} from './services/cryptoApi'
import { newsApi } from './services/newsApi';

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(cryptoApi.middleware, newsApi.middleware)
});
