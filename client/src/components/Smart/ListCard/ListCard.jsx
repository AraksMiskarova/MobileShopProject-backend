import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Stack,
  useMediaQuery,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import style from './ListCard.module.scss';

import {
  setSelectedProducts,
  stateSelectedProducts,
} from '../../../redux/slices/shopping-cart';

import {
  setSelectedProductsFav,
  stateSelectedProductsFav,
} from '../../../redux/slices/wishList';

import {
  fetchAddProductsCart,
  increaseTotalQuantity,
} from '../../../redux/slices/cartBack';

function ListCard({
  product,
  name,
  currentPrice,
  imageUrl,
  itemNo,
  lg,
  md,
  sm,
}) {
  const dispatch = useDispatch();

  // *** Not authorized logic ***

  const selectedProducts = useSelector(stateSelectedProducts);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(
    JSON.parse(localStorage.getItem(product.itemNo)) || false,
  );

  useEffect(() => {
    setIsDisabled(
      selectedProducts.some(item => item.itemNo === product.itemNo),
    );
  }, [selectedProducts, product.itemNo]);

  useEffect(() => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === product.itemNo,
    );
    setIsFavorite(Boolean(isExist));
  }, ['favorites', selectedProductsFav]);

  const handleBuyNow = (e, params) => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(params);
    dispatch(setSelectedProducts(data));
    setIsDisabled(true);
    // localStorage.setItem(params.itemNo, JSON.stringify(true));
  };

  const handleAddToFav = params => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProductsFav.concat(params);
    dispatch(setSelectedProductsFav(data));
  };

  const handleRemoveFromFav = params => {
    const data = selectedProductsFav.filter(
      item => item.itemNo !== params.itemNo,
    );
    dispatch(setSelectedProductsFav(data));
    setIsFavorite(false);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFromFav(product);
      localStorage.removeItem(product.itemNo);
    } else {
      handleAddToFav(product);
      localStorage.setItem('favorites', JSON.stringify(product));
    }
  };

  // *** AUTHORIZED logic ***
  const isAuth = Boolean(localStorage.getItem('token'));
  const bearer = localStorage.getItem('token');

  const handleBuyCartBack = (e, prodId) => {
    dispatch(fetchAddProductsCart({ token: bearer, productId: prodId }));
    dispatch(increaseTotalQuantity());
  };

  const isMobile = useMediaQuery('(max-width:1170px)');

  return (
    <Grid
      item
      xs={12}
      sm={sm}
      md={md}
      lg={lg}
      style={isMobile ? {} : { maxHeight: '440px', marginBottom: '5px' }}
    >
      {' '}
      <Stack spacing={4}>
        <Card className={style.card}>
          <NavLink to={`/products/${itemNo}`} className={style.mainLink}>
            <CardMedia
              className={style.cardMedia}
              component="img"
              image={imageUrl}
              alt={name}
            />
          </NavLink>
          <CardContent className={style.cardContent}>
            <NavLink to={`/product/${itemNo}`} className={style.mainLink}>
              <div className={style.typography}>
                <Typography variant="p">{name}</Typography>
                <Typography variant="p">{currentPrice}$</Typography>
              </div>
            </NavLink>
            <div className={style.cardIcon}>
              <ButtonDark
                label={isDisabled ? 'Added' : 'BUY NOW'}
                disabled={isDisabled}
                onClick={
                  isAuth
                    ? e => handleBuyCartBack(e, product._id)
                    : e => handleBuyNow(e, product)
                }
              />
              <button
                className={style.cardFavButton}
                type="button"
                onClick={handleToggleFavorite}
              >
                {isFavorite ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : (
                  <FavoriteIcon />
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
}

ListCard.defaultProps = {
  name: 'iPhone 14 Pro Max',
  currentPrice: 1000,
  imageUrl: './logo2.png',
  itemNo: '00000',
  lg: 4,
  md: 4,
  sm: 6,
};

ListCard.propTypes = {
  product: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.number,
    ]),
  ).isRequired,
  name: PropTypes.string,
  currentPrice: PropTypes.number,
  imageUrl: PropTypes.string,
  itemNo: PropTypes.string,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
};

export default ListCard;
