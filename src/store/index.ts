import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import appReducers from '../slices';

// const middleware = getDefaultMiddleware({
//   serializableCheck: false,
//   immutableCheck: false,
//   logger,
// });

const logger = createLogger();

const store = configureStore({
  reducer: {
    ...appReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;
