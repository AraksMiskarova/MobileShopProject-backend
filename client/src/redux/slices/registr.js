import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk(
  'registration/fetchUserData',
  async params => {
    try {
      const { data } = await axios.post('/api/customers', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  data: null,
  status: 'loading',
};

const registSlice = createSlice({
  name: 'registration',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        const newState = {
          ...state,
          status: 'loading',
          data: null,
        };
        return newState;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const newState = {
          ...state,
          status: 'loaded',
          data: [action.payload],
        };
        return newState;
      })
      .addCase(fetchUserData.rejected, state => {
        const newState = {
          ...state,
          status: 'error',
          data: null,
        };
        return newState;
      });
  },
});

export const registReducer = registSlice.reducer;
