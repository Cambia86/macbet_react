import {createSlice} from '@reduxjs/toolkit';

const journeySlice = createSlice({

  name: 'journey',
  initialState: { currentJourney: [] },
  reducers: {
    addToJourney:(state,action)=>{
        state.currentJourney.push( action.payload)
    }
  }
})

export const { addToJourney } = journeySlice.actions;

export default journeySlice.reducer;