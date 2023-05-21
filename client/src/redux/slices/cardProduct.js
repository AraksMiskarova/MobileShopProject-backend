import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCardProduct = createAsyncThunk(
  'cardProduct/fetchCardProduct',
  async id => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  product: null,
  status: 'loading',
};

export const getCardProduct = createSlice({
  name: 'cardProduct',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCardProduct.pending, state => {
        const newState = {
          ...state,
          status: 'loading',
          product: null,
        };
        return newState;
      })
      .addCase(fetchCardProduct.fulfilled, (state, action) => {
        const newState = {
          ...state,
          status: 'loaded',
          product: action.payload,
        };
        return newState;
      })
      .addCase(fetchCardProduct.rejected, state => {
        const newState = {
          ...state,
          status: 'error',
          product: null,
        };
        return newState;
      });
  },
});

export const cardProductReducer = getCardProduct.reducer;

export const cardProductState = state => state.cardProduct;
