import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import {
  decreaseCount,
  increaseCount,
  setSelectedProducts,
  stateSelectedProducts,
  toggleDrawer,
} from '../../../redux/slices/shopping-cart';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import FooterShoppingCart from '../FooterShoppingCart/FooterShoppingCart';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import EmptyCart from '../EmptyCart/EmptyCart';

import {
  cartBackState,
  fetchCartProducts,
  fetchDelProductsCart,
  fetchAddProductQuant,
  fetchDelProductQuant,
  increaseTotalQuantity,
  decreaseTotalQuantity,
} from '../../../redux/slices/cartBack';

function ShoppingCart() {
  const isAuth = Boolean(localStorage.getItem('token'));
  const dispatch = useDispatch();

  // *** Not authorized logic ***
  const selectedProducts = useSelector(stateSelectedProducts);

  const handleCheckout = () => {
    dispatch(toggleDrawer(false));
  };
  const result = selectedProducts.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.quantityCart * currentItem.currentPrice,
    0,
  );
  const handleRemoveItem = itemNo => {
    const data = selectedProducts.filter(item => item.itemNo !== itemNo);
    dispatch(setSelectedProducts(data));
  };
  const handleIncreaseCount = itemNo => {
    dispatch(increaseCount(itemNo));
  };

  const handleDecreaseCount = (itemNo, count) => {
    if (count < 2) {
      return;
    }
    dispatch(decreaseCount(itemNo));
  };

  // *** AUTHORIZED logic ***
  const [cartBackTotal, setCartBackTotal] = useState(0);
  const [cartBackLocal, setCartBackLocal] = useState(null);
  const cartBackLocalState = Boolean(
    cartBackLocal !== null ? cartBackLocal.length : false,
  );

  const { productsCartBack, statusCartBack } = useSelector(cartBackState);
  const bearer = localStorage.getItem('token');
  const backStatus = statusCartBack && productsCartBack && isAuth;

  useEffect(() => {
    if (isAuth && bearer) {
      dispatch(fetchCartProducts(bearer));
    }
  }, []);

  useEffect(() => {
    if (productsCartBack) {
      setCartBackLocal(productsCartBack);
    }
  }, [productsCartBack]);

  useEffect(() => {
    if (cartBackLocal) {
      const totalPrice = cartBackLocal.reduce((acc, prod) => {
        return acc + prod.product.currentPrice * prod.cartQuantity;
      }, 0);
      setCartBackTotal(totalPrice);
    }
  }, [cartBackLocal]);

  const handleRemoveItemBack = prodId => {
    dispatch(fetchDelProductsCart({ token: bearer, productId: prodId }));
    const updatedCart = cartBackLocal.filter(
      prod => prod.product._id !== prodId,
    );
    setCartBackLocal(updatedCart);
  };

  const handleIncreaseCountBack = prodId => {
    dispatch(fetchAddProductQuant({ token: bearer, productId: prodId }));
    const updatedCart = cartBackLocal.map(prod => {
      if (prod.product._id === prodId) {
        return {
          ...prod,
          cartQuantity: prod.cartQuantity + 1,
        };
      }
      return prod;
    });
    setCartBackLocal(updatedCart);
    dispatch(increaseTotalQuantity());
  };

  const handleDecreaseCountBack = (prodId, count) => {
    if (count < 2) {
      return;
    }
    dispatch(fetchDelProductQuant({ token: bearer, productId: prodId }));
    const updatedCart = cartBackLocal.map(prod => {
      if (prod.product._id === prodId) {
        return {
          ...prod,
          cartQuantity: prod.cartQuantity - 1,
        };
      }
      return prod;
    });
    setCartBackLocal(updatedCart);
    dispatch(decreaseTotalQuantity());
  };

  if (selectedProducts.length && !isAuth) {
    return (
      <>
        <ShoppingCartItem
          items={selectedProducts}
          remove={handleRemoveItem}
          increase={handleIncreaseCount}
          decrease={handleDecreaseCount}
          addItemBack={handleIncreaseCountBack}
        />
        <Box
          sx={{ display: 'flex', justifyContent: 'space-around' }}
          marginRight="25px"
          marginBottom="25px"
        >
          <FooterShoppingCart amount={result} />
          <NavLink to="/checkout">
            <ButtonDark label="CHECKOUT" onClick={handleCheckout} />
          </NavLink>
        </Box>
      </>
    );
  }
  if (backStatus && productsCartBack && cartBackLocalState) {
    return (
      <>
        {cartBackLocal.map(prod => (
          <ShoppingCartItem
            key={prod.product.itemNo}
            items={null}
            itemBack={prod.product}
            cartBackId={prod._id}
            cartBackQuantity={prod.cartQuantity}
            removeBack={handleRemoveItemBack}
            increaseBack={handleIncreaseCountBack}
            decreaseBack={handleDecreaseCountBack}
          />
        ))}
        <Box
          sx={{ display: 'flex', justifyContent: 'space-around' }}
          marginRight="25px"
          marginBottom="25px"
        >
          <FooterShoppingCart amount={cartBackTotal} />
          <NavLink to="/checkout">
            <ButtonDark label="CHECKOUT" onClick={handleCheckout} />
          </NavLink>
        </Box>
      </>
    );
  }
  if (!selectedProducts.length || !cartBackLocalState) {
    return <EmptyCart />;
  }
}

export default ShoppingCart;
