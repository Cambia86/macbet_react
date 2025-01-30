import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import journeyReducer from "./reducer/journeyReducer"
import navigationReducer from "./reducer/navigationReducer"
import storage from 'redux-persist/lib/storage'; // Usa localStorage
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer  = combineReducers({
    // here we will be adding reducers
    journey: journeyReducer,
    navigation: navigationReducer
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer );

  const store = configureStore({
    reducer: persistedReducer,
    
});
  // const store = configureStore({
  //   persistedReducer,
  // })

// export default store;
export const persistor = persistStore(store);
export default store;