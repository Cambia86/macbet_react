import { createSlice,current  } from '@reduxjs/toolkit';

const journeySlice = createSlice({

  name: 'journey',
  initialState: { currentJourney: [] },
  reducers: {
    addToJourney: (state, action) => {
      state.currentJourney.push(action.payload)
    },

    removeFromJourney: (state, action) => {
      state.currentJourney.splice(state.currentJourney.findIndex((arrow) => arrow.id === action.payload), 1);
    }
  }
})

export const { addToJourney ,removeFromJourney} = journeySlice.actions;

export default journeySlice.reducer;