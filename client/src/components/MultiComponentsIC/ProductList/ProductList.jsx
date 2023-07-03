import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFilterPhones,
  filterProdState,
} from '../../../redux/slices/filterProducts';
import TableProducts from './TableProducts';
import style from './ProductList.module.scss';

function ProductList() {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(filterProdState);
  const urlParams = new URLSearchParams();

  useEffect(() => {
    const url = decodeURIComponent(urlParams.toString().replace(/%2C/g, ','));
    dispatch(fetchFilterPhones(url));
  }, []);

  return (
    //eslint-disable-next-line react/react-in-jsx-scope
    <Container maxWidth="lg" className={style.container}>
      {!selectedProducts?.products?.products && 'loading'}
      {selectedProducts?.products?.products && (
        //eslint-disable-next-line react/react-in-jsx-scope
        <TableProducts items={selectedProducts.products.products} />
      )}
    </Container>
  );
}

export default ProductList;
