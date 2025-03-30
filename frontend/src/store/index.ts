import { configureStore } from '@reduxjs/toolkit';
import { courierSlice } from './reducer/courier';

export const store = configureStore({
  reducer: {
    courier: courierSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
