import { React, useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import style from './WishlistPage.module.scss';
import ListCard from '../../components/Smart/ListCard/ListCard';
import ListCardSkeleton from '../../components/Smart/ListCard/ListCardSkeleton';
import { filterProdState } from '../../redux/slices/filterProducts';
import { stateSelectedProductsFav } from '../../redux/slices/wishList';

function WishlistPage() {
  const [isLoading] = useState(false);
  const [prodArr, setProdArr] = useState([]);
  const { status, products } = useSelector(filterProdState);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(selectedProductsFav));
  }, [selectedProductsFav]);

  useEffect(() => {
    if (status === 'loaded') {
      setProdArr(products);
    }
  }, [status, products]);

  if (isLoading) {
    return (
      <Grid container spacing={4} marginTop={0} marginBottom={2}>
        {Array.from({ length: 9 }).map((_, index) => (
          <ListCardSkeleton key={index} />
        ))}
      </Grid>
    );
  }

  if (prodArr.length === 0) {
    return (
      <Container maxWidth="lg">
        <div className={style.title}>
          <h2>Your Wishlist In MobiStore</h2>
          <p>
            We all have some desires, this is your wish list in MobiStore. What
            is it for? You can share your wish list with others, for example in
            the form of a clue what you want for your birthday. Or note what you
            liked, so as not to fill your head with unnecessary trifles. And if
            you know what you need this product later, save it here so you do
            not have to look it up later.
          </p>
        </div>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg">
      <div className={style.title}>
        <h2>Your Wishlist In MobiStore</h2>
        <p>
          We all have some desires, this is your wish list in MobiStore. What is
          it for? You can share your wish list with others, for example in the
          form of a clue what you want for your birthday. Or note what you
          liked, so as not to fill your head with unnecessary trifles. And if
          you know what you need this product later, save it here so you do not
          have to look it up later.
        </p>
      </div>
      <Grid container spacing={1} marginTop={0} marginBottom={5}>
        {selectedProductsFav.map((product, index) => (
          <ListCard
            product={product}
            key={index}
            imageUrl={product.imageUrls[0]}
            name={product.name}
            currentPrice={product.currentPrice}
            itemNo={product.itemNo}
            lg={3}
            md={4}
            sm={6}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default WishlistPage;
