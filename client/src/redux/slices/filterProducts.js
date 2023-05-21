import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilterProducts = createAsyncThunk(
  'filterProducts/fetchFilterProducts',
  async params => {
    const filterParams = `${params}&perPage=9&` ?? '';
    try {
      const { data } = await axios.get(`/api/products/filter?${filterParams}`);
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  products: null,
  status: 'loading',
  filterMinPrice: 600,
  filterMaxPrice: 2000,
  selectPage: 1,
};

export const getFilterProd = createSlice({
  name: 'filterProducts',
  initialState,
  reducers: {
    setMinPrice: (state, action) => {
      const newState = {
        ...state,
        filterMinPrice: action.payload,
      };
      return newState;
    },
    setMaxPrice: (state, action) => {
      const newState = {
        ...state,
        filterMaxPrice: action.payload,
      };
      return newState;
    },
    setSelectPage: (state, action) => {
      const newState = {
        ...state,
        selectPage: action.payload,
      };
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilterProducts.pending, state => {
        const newState = {
          ...state,
          status: 'loading',
          products: null,
        };
        return newState;
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        const newState = {
          ...state,
          status: 'loaded',
          products: action.payload,
        };
        return newState;
      })
      .addCase(fetchFilterProducts.rejected, state => {
        const newState = {
          ...state,
          status: 'error',
          products: null,
        };
        return newState;
      });
  },
});

export const filterProdReducer = getFilterProd.reducer;

export const {
  setMinPrice,
  setMaxPrice,
  setSelectPage,
  setQueryString,
  setStartQueryString,
} = getFilterProd.actions;

export const filterProdState = state => state.filterProducts;
