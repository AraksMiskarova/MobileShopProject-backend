import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import MainCardSlider from '../MainCardSlider/MainCardSlider';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import style from './MainCard.module.scss';
import {
  setSelectedProducts,
  stateSelectedProducts,
} from '../../../redux/slices/shopping-cart';
import {
  setSelectedProductsFav,
  stateSelectedProductsFav,
} from '../../../redux/slices/wishList';

function MainCard({
  product,
  imageUrls,
  name,
  currentPrice,
  color,
  description,
}) {
  const dispatch = useDispatch();
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
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(selectedProductsFav));
  }, [selectedProductsFav]);

  useEffect(() => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === product.itemNo,
    );
    setIsFavorite(Boolean(isExist));
  }, ['favorites', selectedProductsFav]);

  const handleBuyNow = e => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === product.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(product);
    dispatch(setSelectedProducts(data));
  };
  const handleAddToFav = () => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === product.itemNo,
    );
    if (isExist) return;

    const data = selectedProductsFav.concat(product);
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
  return (
    <Card className={style.card}>
      <MainCardSlider imageUrls={imageUrls} />
      <CardContent className={style.cardContent}>
        <div className={style.typography}>
          <Typography variant="p">{name}</Typography>
          <Typography variant="p">{currentPrice}$</Typography>
        </div>
        <div className={style.cardDescrip}>
          <Typography variant="p">Color: {color}</Typography>
          <Typography variant="p">{description}</Typography>
        </div>
        <div className={style.cardIcon}>
          <NavLink onClick={handleBuyNow}>
            <ButtonDark
              label={isDisabled ? 'Added' : 'BUY NOW'}
              disabled={isDisabled}
              style={{ fontWeight: 800, fontSize: 25 }}
            />
          </NavLink>
          <button
            className={style.cardFavButton}
            type="button"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? (
              <FavoriteIcon
                style={{ color: 'red', width: 55, height: 55, borderRadius: 5 }}
              />
            ) : (
              <FavoriteIcon
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 5,
                }}
              />
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

MainCard.defaultProps = {
  name: 'iPhone 14 Pro Max',
  currentPrice: '1000$',
  description: 'Here is some cool product description',
  color: 'Here is some cool color',
};

MainCard.propTypes = {
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
  description: PropTypes.string,
  color: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainCard;
