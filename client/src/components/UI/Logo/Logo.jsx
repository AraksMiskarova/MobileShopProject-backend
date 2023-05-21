import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Logo.module.scss';

function Logo() {
  return (
    <NavLink to="/">
      <div className={style.root}>
        <img src="/logo.png" alt="" className={style.img} />
      </div>
    </NavLink>
  );
}

export default Logo;
