import React from 'react';
import { Box, Typography } from '@mui/material';

function EmptyCart() {
  return (
    <Box sx={{ minWidth: 375 }}>
      <Typography sx={{ textAlign: 'center', padding: '20px 0' }}>
        Your Cart is empty
      </Typography>
    </Box>
  );
}

export default EmptyCart;
