import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Badge } from '@mui/material';

import AvatarUser from '../../UI/Avatar/AvatapUser';

import style from './NavIcon.module.scss';

function NavIcon({
  cartCount,
  favCount,
  nameAvatar,
  avatarSrc,
  isAuth,
  onClickLogOut,
  onClickOpenDrawer,
}) {
  return (
    <div className={style.root}>
      <div className={style.containerIcon}>
        <div className={style.link}>
          <IconButton onClick={onClickOpenDrawer}>
            <Badge badgeContent={cartCount} className={style.badge}>
              <ShoppingCartIcon
                className={style.icon}
                onClick={onClickOpenDrawer}
              />
            </Badge>
          </IconButton>
        </div>
        <NavLink to="/wishlist" className={style.link}>
          <IconButton>
            <Badge badgeContent={favCount} className={style.badge}>
              <FavoriteIcon className={style.icon} />
            </Badge>
          </IconButton>
        </NavLink>
      </div>
      <div className={style.containerAvatar}>
        <NavLink to={isAuth ? '/' : '/login'} className={style.link}>
          <AvatarUser
            nameAvatar={nameAvatar}
            avatarSrc={avatarSrc}
            isAuth={isAuth}
            onClickLogOut={onClickLogOut}
          />
        </NavLink>
      </div>
    </div>
  );
}

NavIcon.defaultProps = {
  avatarSrc: '#',
  cartCount: 666,
  favCount: 999,
  nameAvatar: 'Jhon Dou',
  isAuth: false,
};

NavIcon.propTypes = {
  avatarSrc: PropTypes.string,
  cartCount: PropTypes.number,
  favCount: PropTypes.number,
  nameAvatar: PropTypes.string,
  isAuth: PropTypes.bool,
  onClickLogOut: PropTypes.func.isRequired,
  onClickOpenDrawer: PropTypes.func.isRequired,
};

export default NavIcon;
