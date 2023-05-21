import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@mui/material';

function AvatarUser({ nameAvatar, avatarSrc, isAuth, onClickLogOut }) {
  const firstLetter = nameAvatar.charAt(0).toUpperCase();

  return isAuth ? (
    <>
      <Avatar
        sx={{ width: 56, height: 56 }}
        src={avatarSrc}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {firstLetter}
      </Avatar>
      <Button
        variant="contained"
        color="secondary"
        onClick={onClickLogOut}
        style={{
          borderRadius: 2,
          fontFamily: 'montserrat',
          fontSize: 13,
          fontWeight: 600,
          padding: 1,
          marginTop: 10,
          width: '100%',
        }}
      >
        Log Out
      </Button>
    </>
  ) : (
    <Button
      variant="contained"
      color="secondary"
      style={{
        borderRadius: 2,
        fontFamily: 'montserrat',
      }}
    >
      Log in
    </Button>
  );
}

AvatarUser.defaultProps = {
  avatarSrc: '#',
  nameAvatar: 'Jhon Dou',
  isAuth: false,
};

AvatarUser.propTypes = {
  nameAvatar: PropTypes.string,
  avatarSrc: PropTypes.string,
  isAuth: PropTypes.bool,
  onClickLogOut: PropTypes.func.isRequired,
};

export default AvatarUser;
