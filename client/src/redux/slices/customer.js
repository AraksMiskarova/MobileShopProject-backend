import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { fetchData } from '../../helpers/toolkit/fetches';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

export const fetchCustomerData = createAsyncThunk(
  'customer/fetchCustomer',
  async () => {
    return fetchData(`/api/customers/customer`, 'get');
  },
);

export const fetchNewCustomerData = createAsyncThunk(
  'customer/fetchNewCustomer',
  async params => {
    try {
      const { data } = await axios.put('/api/customers', params, {
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
  customer: null,
  status: 'loading',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(
        fetchCustomerData.pending,
        createAsyncReducer('customer').pending,
      )
      .addCase(
        fetchCustomerData.fulfilled,
        createAsyncReducer('customer').fulfilled,
      )
      .addCase(
        fetchCustomerData.rejected,
        createAsyncReducer('customer').rejected,
      )
      .addCase(
        fetchNewCustomerData.pending,
        createAsyncReducer('customer').pending,
      )
      .addCase(
        fetchNewCustomerData.fulfilled,
        createAsyncReducer('customer').fulfilled,
      )
      .addCase(
        fetchNewCustomerData.rejected,
        createAsyncReducer('customer').rejected,
      );
  },
});

export const customerState = state => state.customer;
export const customerReducer = customerSlice.reducer;
