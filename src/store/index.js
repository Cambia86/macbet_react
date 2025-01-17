import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import journeyReducer from "./reducer/journeyReducer"
import navigationReducer from "./reducer/navigationReducer"

const reducer = combineReducers({
    // here we will be adding reducers
    journey: journeyReducer,
    navigation: navigationReducer
  })
  const store = configureStore({
    reducer,
  })

export default store;