import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import style from './BasketQuantity.module.scss';

function BasketQuantity() {
  const [count, setCount] = React.useState(1);
  return (
    <ButtonGroup className={style.quantity}>
      <Button
        className={style.button}
        aria-label="reduce"
        onClick={() => {
          setCount(Math.max(count - 1, 0));
        }}
      >
        <RemoveIcon fontSize="small" />
      </Button>
      <div className={style.input}>{count}</div>
      <Button
        className={style.button}
        aria-label="increase"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}

export default BasketQuantity;
