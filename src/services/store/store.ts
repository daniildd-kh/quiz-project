import { combineReducers, configureStore } from '@reduxjs/toolkit'
import decksSlice from './reducers/DecksSlice';

import { useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook } from 'react-redux';
import userSlice from './reducers/UserSlice';

export const rootReducer = combineReducers({
  decksSlice,
  userSlice
})

export const store = configureStore({
  reducer: rootReducer,

})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store