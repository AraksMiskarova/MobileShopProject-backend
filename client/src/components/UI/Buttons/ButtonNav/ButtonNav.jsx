import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function ButtonNav({ label, color, variant, disabled, style }) {
  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled}
      style={{
        minWidth: 120,
        borderRadius: 2,
        fontFamily: 'montserrat',
        marginLeft: -25,
        ...style,
      }}
    >
      {label}
    </Button>
  );
}

ButtonNav.defaultProps = {
  label: 'My Button',
  color: 'secondary',
  variant: 'text',
  disabled: false,
  style: '',
};

ButtonNav.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ButtonNav;
