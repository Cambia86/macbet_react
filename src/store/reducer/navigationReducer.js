import {createSlice} from '@reduxjs/toolkit';

const navigationSlice = createSlice({

  name: 'navigation',
  initialState: { currentPrevisionDay: ""},
  reducers: {
    setNavigationDate:(state,action)=>{
        state.currentPrevisionDay = action.payload;
    }
  }
})

export const { setNavigationDate } = navigationSlice.actions;

export default navigationSlice.reducer;
