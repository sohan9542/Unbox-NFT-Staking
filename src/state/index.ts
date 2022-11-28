import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './user'
import mintReducer from './mint'

export const store = configureStore({
  reducer: {
    user: userReducer,
    mint: mintReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>