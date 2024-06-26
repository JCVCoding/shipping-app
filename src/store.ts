import { combineReducers, configureStore } from "@reduxjs/toolkit";
import billingReducer from "./features/billing/billingSlice";
import quoteReducer from "./features/quote/quoteSlice";
import fromZIPReducer from "./features/fromZIP/fromZIPSlice";
import toZIPReducer from "./features/toZIP/toZIPSlice";
import shipReducer from "./features/ship/shipSlice";
import selectedQuoteReducer from "./features/selectedQuote/selectedQuoteSlice";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";

const allReducers = combineReducers({
  billing: billingReducer,
  quote: quoteReducer,
  fromZIP: fromZIPReducer,
  toZIP: toZIPReducer,
  ship: shipReducer,
  selectedQuote: selectedQuoteReducer,
  user: userReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: allReducers,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
