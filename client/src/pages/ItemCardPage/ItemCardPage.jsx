import { React, useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import { Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  cardProductState,
  fetchCardProduct,
} from '../../redux/slices/cardProduct';

import MainCard from '../../components/Smart/MainCard/MainCard';
import MainCardSkeleton from '../../components/Smart/MainCard/MainCardSkeleton';
import CardHelpInfo from '../../components/UI/CardHelpInfo/CardHelpInfo';

import style from './ItemCardPage.module.scss';

function ItemCardPage() {
  const dispatch = useDispatch();
  const [currentProd, setCurrentProd] = useState();
  const { status, product } = useSelector(cardProductState);
  const match = useMatch('/products/:itemNo');
  const { itemNo } = match.params;

  useEffect(() => {
    dispatch(fetchCardProduct(itemNo));
  }, [itemNo]);

  useEffect(() => {
    if (status === 'loaded') {
      setCurrentProd(product);
    }
  }, [status, product]);

  if (status === 'loading') {
    return (
      <div className={style.mainCardContainer}>
        <MainCardSkeleton />
        <CardHelpInfo />
      </div>
    );
  }

  if (currentProd && status === 'loaded') {
    return (
      <Container maxWidth="lg">
        {' '}
        <div className={style.mainCardContainer}>
          <MainCard
            product={currentProd}
            name={currentProd.name}
            currentPrice={currentProd.currentPrice}
            description={currentProd.description}
            color={currentProd.color}
            imageUrls={currentProd.imageUrls}
          />
          <CardHelpInfo />
        </div>
      </Container>
    );
  }
}

export default ItemCardPage;
