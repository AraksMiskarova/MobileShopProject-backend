import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  selectedProductsFav: [],
};

const wishListSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    selectProductFav(state, action) {
      const newState = {
        ...state,
        selectedProductsFav: [...state.selectedProductsFav, action.payload],
      };
      return newState;
    },
    setSelectedProductsFav(state, action) {
      const newState = {
        ...state,
        selectedProductsFav: action.payload,
      };
      return newState;
    },
  },
});

export const { setSelectedProductsFav } = wishListSlice.actions;
export const stateSelectedProductsFav = state =>
  state.favorites.selectedProductsFav;

export const favoritesReducer = wishListSlice.reducer;
