import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

export const fetchFilterProducts = createAsyncThunk(
  'filterProducts/fetchFilterProducts',
  async params => {
    const filterParams = `${params}` ?? '';
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
  viewCount: '9',
  sortPrice: null,
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
    setViewCount: (state, action) => {
      const newState = {
        ...state,
        viewCount: action.payload,
      };
      return newState;
    },
    setLeastPrice: state => {
      const newState = {
        ...state,
        sortPrice: '-currentPrice',
      };
      return newState;
    },
    setMostPrice: state => {
      const newState = {
        ...state,
        sortPrice: '+currentPrice',
      };
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchFilterProducts.pending,
        createAsyncReducer('products').pending,
      )
      .addCase(
        fetchFilterProducts.fulfilled,
        createAsyncReducer('products').fulfilled,
      )
      .addCase(
        fetchFilterProducts.rejected,
        createAsyncReducer('products').rejected,
      );
  },
});

export const filterProdReducer = getFilterProd.reducer;

export const {
  setMinPrice,
  setMaxPrice,
  setSelectPage,
  setViewCount,
  setLeastPrice,
  setMostPrice,
} = getFilterProd.actions;

export const filterProdState = state => state.filterProducts;
