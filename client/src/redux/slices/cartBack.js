import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartProducts = createAsyncThunk(
  'cartBackEnd/fetchCartProducts',
  async token => {
    try {
      const { data } = await axios.get(`/api/cart`, {
        headers: {
          Authorization: token,
        },
      });
      const { products } = data;
      return products;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const fetchAddProductsCart = createAsyncThunk(
  'cartBackEnd/fetchAddProductsCart',
  async ({ token, productId }) => {
    try {
      const { data } = await axios.put(`/api/cart/${productId}`, null, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const fetchDelProductsCart = createAsyncThunk(
  'cartBackEnd/fetchDelProductsCart',
  async ({ token, productId }) => {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const fetchAddProductQuant = createAsyncThunk(
  'cartBackEnd/fetchAddProductsQuant',
  async ({ token, productId }) => {
    try {
      const { data } = await axios.put(`/api/cart/${productId}`, null, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const fetchDelProductQuant = createAsyncThunk(
  'cartBackEnd/fetchDelProductQuant',
  async ({ token, productId }) => {
    try {
      const { data } = await axios.delete(`/api/cart/product/${productId}`, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  productsCartBack: null,
  statusCartBack: 'loading',
  totalQuantityBack: null,
};

export const cartBack = createSlice({
  name: 'cartBackEnd',
  initialState,
  reducers: {
    increaseTotalQuantity: state => {
      const newState = {
        ...state,
        totalQuantityBack: state.totalQuantityBack + 1,
      };
      return newState;
    },
    decreaseTotalQuantity: state => {
      const newState = {
        ...state,
        totalQuantityBack: state.totalQuantityBack - 1,
      };
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCartProducts.pending, state => {
        const newState = {
          ...state,
          statusCartBack: 'loading',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        const prodArr = action.payload;
        const totalQuantity = prodArr
          ? prodArr.reduce((total, prod) => total + prod.cartQuantity, 0)
          : null;

        const newState = {
          ...state,
          statusCartBack: 'loaded',
          productsCartBack: action.payload,
          totalQuantityBack: totalQuantity,
        };
        return newState;
      })
      .addCase(fetchCartProducts.rejected, state => {
        const newState = {
          ...state,
          statusCartBack: 'error',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchAddProductsCart.pending, state => {
        const newState = {
          ...state,
          statusCartBack: 'loading',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchAddProductsCart.fulfilled, (state, action) => {
        const newState = {
          ...state,
          statusCartBack: 'loaded',
          productsCartBack: action.payload.products,
        };
        return newState;
      })
      .addCase(fetchAddProductsCart.rejected, state => {
        const newState = {
          ...state,
          statusCartBack: 'error',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchDelProductsCart.pending, state => {
        const newState = {
          ...state,
          statusCartBack: 'loading',
        };
        return newState;
      })
      .addCase(fetchDelProductsCart.fulfilled, (state, action) => {
        const prodArr = action.payload.products;
        const totalQuantity = prodArr.reduce(
          (total, prod) => total + prod.cartQuantity,
          0,
        );
        const newState = {
          ...state,
          statusCartBack: 'loaded',
          productsCartBack: action.payload.products,
          totalQuantityBack: totalQuantity,
        };
        return newState;
      })
      .addCase(fetchDelProductsCart.rejected, state => {
        const newState = {
          ...state,
          statusCartBack: 'error',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchDelProductQuant.pending, state => {
        const newState = {
          ...state,
          statusCartBack: 'loading',
        };
        return newState;
      })
      .addCase(fetchDelProductQuant.fulfilled, state => {
        const newState = {
          ...state,
          statusCartBack: 'loaded',
        };
        return newState;
      })
      .addCase(fetchDelProductQuant.rejected, state => {
        const newState = {
          ...state,
          statusCartBack: 'error',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchAddProductQuant.pending, state => {
        const newState = {
          ...state,
          statusCartBack: 'loading',
        };
        return newState;
      })
      .addCase(fetchAddProductQuant.fulfilled, state => {
        const newState = {
          ...state,
          statusCartBack: 'loaded',
        };
        return newState;
      })
      .addCase(fetchAddProductQuant.rejected, state => {
        const newState = {
          ...state,
          statusCartBack: 'error',
          productsCartBack: null,
        };
        return newState;
      });
  },
});

export const { increaseTotalQuantity, decreaseTotalQuantity } =
  cartBack.actions;

export const cartBackReducer = cartBack.reducer;
export const cartBackState = state => state.cartBackEnd;
