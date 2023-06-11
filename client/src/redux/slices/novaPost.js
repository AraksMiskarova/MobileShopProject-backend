import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

const apiKey = 'a0644bf9bce4be4ace08ecba0a4b0c0b';

export const fetchNovaPost = createAsyncThunk(
  'novaPost/fetchNovaPost',
  async ({ fetchCity, fetchLimit }) => {
    try {
      const { data } = await axios.post(
        'https://api.novaposhta.ua/v2.0/json/',
        {
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityName: fetchCity,
            Limit: fetchLimit,
            Page: 1,
          },
          apiKey,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return data.data;
    } catch (error) {
      return console.warn('NovaPost_ERR', error);
    }
  },
);

const initialState = {
  warehouses: null,
  warehousesCity: null,
  status: 'loading',
};

export const getNovaPost = createSlice({
  name: 'novaPost',
  initialState,
  reducers: {
    updateWarehousesCity(state, action) {
      return {
        ...state,
        warehousesCity: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNovaPost.pending, createAsyncReducer('warehouses').pending)
      .addCase(
        fetchNovaPost.fulfilled,
        createAsyncReducer('warehouses').fulfilled,
      )
      .addCase(
        fetchNovaPost.rejected,
        createAsyncReducer('warehouses').rejected,
      );
  },
});

export const { updateWarehousesCity } = getNovaPost.actions;

export const novaPostReducer = getNovaPost.reducer;

export const novaPostState = state => state.novaPost;
