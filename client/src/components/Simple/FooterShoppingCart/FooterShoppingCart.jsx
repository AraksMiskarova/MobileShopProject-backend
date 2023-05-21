import { Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function FooterShoppingCart({ amount }) {
  return (
    <Typography
      sx={{
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        margin: 'auto',
      }}
    >
      Total amount: ${amount}
    </Typography>
  );
}

FooterShoppingCart.defaultProps = {
  amount: 0,
};

FooterShoppingCart.propTypes = {
  amount: PropTypes.number,
};
