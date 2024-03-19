import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from './features/quote/quoteSlice';
import fromZIPReducer from './features/fromZIP/fromZIPSlice';
import toZIPReducer from './features/toZIP/toZIPSlice';
import shipReducer from './features/ship/shipSlice';
import selectedQuoteReducer from './features/selectedQuote/selectedQuoteSlice';

const store = configureStore({
  reducer: {
    quote: quoteReducer,
    fromZIP: fromZIPReducer,
    toZIP: toZIPReducer,
    ship: shipReducer,
    selectedQuote: selectedQuoteReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
