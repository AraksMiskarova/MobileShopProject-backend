import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSearchProduct = createAsyncThunk(
  'auth/fetchSearchProduct',
  async params => {
    try {
      const { data } = await axios.post('/api/products/search', params);
      const searchProducts = data;
      return searchProducts;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  searchProducts: null,
  searchStatus: 'loading',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchSearchProduct.pending, state => {
        const newState = {
          ...state,
          searchStatus: 'loading',
          searchProducts: null,
        };
        return newState;
      })
      .addCase(fetchSearchProduct.fulfilled, (state, action) => {
        const newState = {
          ...state,
          searchStatus: 'loaded',
          searchProducts: action.payload,
        };
        return newState;
      })
      .addCase(fetchSearchProduct.rejected, state => {
        const newState = {
          ...state,
          searchStatus: 'error',
          searchProducts: null,
        };
        return newState;
      });
  },
});

export const searchReducer = searchSlice.reducer;

export const searchState = state => state.search;
