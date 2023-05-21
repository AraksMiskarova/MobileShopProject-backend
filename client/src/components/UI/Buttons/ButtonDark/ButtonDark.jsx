import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function ButtonDark({ label, onClick, color, variant, disabled, style }) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      style={{ minWidth: 150, borderRadius: 2, ...style }}
    >
      {label}
    </Button>
  );
}

ButtonDark.defaultProps = {
  onClick: null,
  label: 'My Button',
  color: 'primary',
  variant: 'contained',
  disabled: false,
  style: null,
};

ButtonDark.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

export default ButtonDark;
