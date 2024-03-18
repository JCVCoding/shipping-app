import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from './features/quote/quoteSlice';

const store = configureStore({
  reducer: {
    quote: quoteReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
