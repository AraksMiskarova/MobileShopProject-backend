import { React, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/auth';
import {
  toggleDrawer,
  stateDrawer,
  stateSelectedProducts,
} from '../../../redux/slices/shopping-cart';

import style from './Navbar.module.scss';

import Logo from '../../UI/Logo/Logo';
import NavLinks from '../../Simple/NavLinks/NavLinks';
import NavIcon from '../../Simple/NavIcon/NavIcon';
import InputNav from '../InputNav/InputNav';
import CartList from '../CartList/CartList';
import { stateSelectedProductsFav } from '../../../redux/slices/wishList';
import { cartBackState } from '../../../redux/slices/cartBack';

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const stateDraw = useSelector(stateDrawer);
  const cartProducts = useSelector(stateSelectedProducts);
  const { totalQuantityBack } = useSelector(cartBackState);
  const favProducts = useSelector(stateSelectedProductsFav);
  const handleLogOut = () => {
    window.localStorage.removeItem('token');
    setIsAuth(false);
    return dispatch(logout());
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return setIsAuth(false);
    }
    if (token) {
      setIsAuth(true);
    }
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    dispatch(toggleDrawer(true));
  };

  const handleDrawerClose = () => {
    dispatch(toggleDrawer(false));
  };

  const isMobile = useMediaQuery('(max-width:768px)');

  const totalQuantity = cartProducts.reduce(
    (total, item) => total + item.quantityCart,
    0,
  );

  const isTab = useMediaQuery('(max-width:940px)');

  return (
    <div>
      {!isMobile ? (
        <AppBar position="static" className={style.root}>
          <Toolbar style={{ padding: '0' }}>
            <Typography
              style={isTab ? { marginRight: '-30px', marginLeft: '-30px' } : {}}
              variant="h6"
            >
              <Logo />
            </Typography>
            <NavLinks />
            <InputNav />
            <NavIcon
              favCount={favProducts.length}
              cartCount={isAuth ? totalQuantityBack : totalQuantity}
              nameAvatar="Artur Tech"
              isAuth={isAuth}
              onClickLogOut={handleLogOut}
              onClickOpenDrawer={handleDrawerOpen}
            />
            <Drawer anchor="right" open={stateDraw} onClose={handleDrawerClose}>
              <CartList onClickClose={handleDrawerClose} />
            </Drawer>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static" className={style.root}>
          <Toolbar>
            <Typography variant="h6">
              <Logo />
            </Typography>
            <NavLinks
              favCount={favProducts.length}
              cartCount={isAuth ? totalQuantityBack : totalQuantity}
              nameAvatar="Artur Tech"
              isAuth={isAuth}
              onClickLogOut={handleLogOut}
              onClickOpenDrawer={handleDrawerOpen}
            />
            <Drawer anchor="right" open={stateDraw} onClose={handleDrawerClose}>
              <CartList onClickClose={handleDrawerClose} />
            </Drawer>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

export default Navbar;
