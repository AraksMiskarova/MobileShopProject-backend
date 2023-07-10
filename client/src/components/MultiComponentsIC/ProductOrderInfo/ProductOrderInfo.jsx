/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Stack, Typography, Divider, Box } from '@mui/material';
import ShoppingCartItem from '../../Smart/ShoppingCartItem/ShoppingCartItem';
import {
  stateSelectedProducts,
  toggleDrawer,
} from '../../../redux/slices/cartLocal';

import FooterShoppingCart from '../../Simple/FooterShoppingCart/FooterShoppingCart';
import ButtonsCheckoutPage from '../../UI/Buttons/ButtonsCheckoutPage/ButtonsCheckoutPage';
import { checkoutState, fetchNewOrder } from '../../../redux/slices/checkout';
import { cartBackState } from '../../../redux/slices/cartBackEnd';

import { isAuthenticated } from '../../../helpers/authentication/authentication';

const ContainerInfo = styled(Grid)`
  background-color: #ffffff;
  padding: 0 5px;
`;

const ContainerItems = styled(Grid)`
  padding: 10 5px 30px;
`;

const Title = styled(Typography)`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

const SectionComponent = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
`;

const SectionTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  padding: 5px;
`;

const SectionInfo = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  padding: 5px;
`;

function ProductOrderInfo() {
  const isAuth = isAuthenticated();
  const { productsCartBack } = useSelector(cartBackState);
  const selectedProducts = useSelector(stateSelectedProducts);

  const result = isAuth
    ? productsCartBack &&
      productsCartBack.reduce((acc, prod) => {
        return acc + prod.product.currentPrice * prod.cartQuantity;
      }, 0)
    : selectedProducts &&
      selectedProducts.reduce(
        (previousValue, currentItem) =>
          previousValue + currentItem.quantityCart * currentItem.currentPrice,
        0,
      );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handelBackToCart = () => {
    dispatch(toggleDrawer(true));
  };

  //  Logic OrderInfo
  // Contact Form
  const { contactsForm, contactsFormStatus } = useSelector(checkoutState);

  const nameBool = Boolean(contactsForm.firstName.length > 0);
  const surnameBool = Boolean(contactsForm.lastName.length > 0);
  const emailBool = Boolean(contactsForm.email.length > 0);
  const phoneBool = Boolean(contactsForm.phoneNumber.length > 0);

  // Delivery and payment

  const { deliveryAddress, shipping, paymentInfo, deliveryPaymentStatus } =
    useSelector(checkoutState);
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const countryBool = Boolean(deliveryAddress.country.length > 0);
  const addressBool = Boolean(deliveryAddress.address.length > 0);
  const postalBool = Boolean(deliveryAddress.postal.length > 0);

  useEffect(() => {
    if (shipping === 'CourierDeliveryKyiv') {
      setDeliveryMethod('Courier for Kyiv');
    }
    if (shipping === 'PostOfficeDelivery') {
      setDeliveryMethod('Delivery by mail to the office');
    }
    if (paymentInfo === 'payment-upon-delivery') {
      setPaymentMethod('Cash on delivery');
    }
    if (paymentInfo === 'payment-by-card') {
      setPaymentMethod('Payment by bank card');
    }
  }, [shipping, paymentInfo]);

  // Order

  const [order, setOder] = useState({
    products: [],
    deliveryAddress: {
      country: '',
      city: '',
      address: '',
      postal: '',
    },
    shipping: '',
    paymentInfo: '',
    status: 'not shipped',
    email: '',
    mobile: '',
    letterSubject: 'Thank you for order! You are welcome!',
    letterHtml: `<h1>Your order is placed.</h1>`,
  });

  useEffect(() => {
    if (contactsFormStatus && deliveryPaymentStatus && selectedProducts) {
      setOder({
        ...order,
        deliveryAddress: {
          ...order.deliveryAddress,
          country: deliveryAddress.country,
          city: deliveryAddress.city.split(' ').shift(),
          address: deliveryAddress.address,
          postal: deliveryAddress.postal,
        },
        shipping: deliveryMethod,
        paymentInfo: paymentMethod,
        status: 'not shipped',
        email: contactsForm.email,
        mobile: contactsForm.phoneNumber,
        letterSubject: `Dear ${contactsForm.firstName} , Thank you for order!`,
        letterHtml: `<h1>Your order is placed.</h1>
        <p>Delivery city: ${deliveryAddress.city.split(' ').shift()}.</p> 
        <p>Delivery Address: ${deliveryAddress.address}</p>
        <p>Payment amount: ${result}$</p>
        <p>We are glad that You choose us! See You soon!</p>`,
        products: isAuth
          ? productsCartBack && productsCartBack
          : selectedProducts.map(prod => {
              return { product: prod, cartQuantity: prod.quantityCart };
            }),
      });
    }
  }, [
    contactsForm,
    deliveryAddress,
    deliveryMethod,
    paymentMethod,
    deliveryPaymentStatus,
    contactsFormStatus,
  ]);

  const handleConfirmOrder = () => {
    console.log('Order>>>>', order);
    navigate('/successful-order');
    dispatch(fetchNewOrder(order));
  };

  const confirmOrderStatus = Boolean(
    deliveryPaymentStatus && contactsFormStatus,
  );

  // Logic small Screen

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const handleScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleScreenSize();
    window.addEventListener('resize', handleScreenSize);
    return () => {
      window.removeEventListener('resize', handleScreenSize);
    };
  }, []);
  return (
    <ContainerInfo container>
      <ContainerItems item xs={isSmallScreen ? 12 : 6}>
        <Title variant="h6">Cart Products</Title>
        <Divider />
        {isAuth ? (
          productsCartBack &&
          productsCartBack.map(prod => (
            <ShoppingCartItem
              key={prod.product.itemNo}
              items={null}
              itemBack={prod.product}
              cartBackId={prod._id}
              cartBackQuantity={prod.cartQuantity}
              buttonDisplay
              quantityDisplay
            />
          ))
        ) : (
          <ShoppingCartItem
            items={selectedProducts}
            buttonDisplay
            quantityDisplay
          />
        )}

        <FooterShoppingCart amount={result} />
      </ContainerItems>
      <ContainerItems item xs={isSmallScreen ? 12 : 6}>
        <Title variant="h6">Order Information</Title>
        <Divider />
        <SectionComponent>
          <SectionTitle variant="h6" style={{ fontWeight: '600' }}>
            Contacts:
          </SectionTitle>
          <SectionInfo
            style={
              !nameBool
                ? { color: 'red', fontSize: '16px' }
                : { fontSize: '16px' }
            }
            variant="p"
          >
            Name: {nameBool ? contactsForm.firstName : ' Not entered'}
          </SectionInfo>
          <SectionInfo
            style={
              !surnameBool
                ? { color: 'red', fontSize: '16px' }
                : { fontSize: '16px' }
            }
            variant="p"
          >
            Surname: {surnameBool ? contactsForm.lastName : ' Not entered'}
          </SectionInfo>
          <SectionInfo
            style={
              !emailBool
                ? { color: 'red', fontSize: '16px' }
                : { fontSize: '16px' }
            }
            variant="p"
          >
            Email: {emailBool ? contactsForm.email : ' Not entered'}
          </SectionInfo>
          <SectionInfo
            style={
              !phoneBool
                ? { color: 'red', fontSize: '16px' }
                : { fontSize: '16px' }
            }
            variant="p"
          >
            PhoneNumber:
            {phoneBool ? contactsForm.phoneNumber : ' Not entered'}
          </SectionInfo>
        </SectionComponent>
        <Divider />
        <SectionComponent>
          <SectionTitle variant="h6" style={{ fontWeight: '600' }}>
            Delivery and Payment:
          </SectionTitle>
          <SectionInfo
            style={
              !countryBool
                ? { color: 'red', fontSize: '16px' }
                : { fontSize: '16px' }
            }
            variant="p"
          >
            Country: {countryBool ? deliveryAddress.country : ' Not entered'}
          </SectionInfo>
          <SectionInfo
            style={
              !addressBool
                ? { color: 'red', fontSize: '16px' }
                : { fontSize: '16px' }
            }
            variant="p"
          >
            Address: {addressBool ? deliveryAddress.address : ' Not entered'}
          </SectionInfo>
          <SectionInfo
            style={
              !postalBool
                ? { color: 'red', fontSize: '16px' }
                : { fontSize: '16px' }
            }
            variant="p"
          >
            Postal:
            {postalBool ? deliveryAddress.postal : ' Not entered'}
          </SectionInfo>
          <SectionInfo variant="p" style={{ fontSize: '16px' }}>
            Delivery method:
            {deliveryMethod ?? ' Not entered'}
          </SectionInfo>
          <SectionInfo variant="p" style={{ fontSize: '16px' }}>
            Payment method:
            {paymentMethod ?? ' Not entered'}
          </SectionInfo>
        </SectionComponent>
      </ContainerItems>
      <Grid item xs={12}>
        <Stack
          sx={{
            padding: isSmallScreen ? '30px 20px' : '50px 20px',
          }}
          direction="column"
          spacing={3}
        >
          <ButtonsCheckoutPage
            label="Confirm order"
            variant="contained"
            size="large"
            disabled={!confirmOrderStatus}
            onClick={handleConfirmOrder}
          />
          <ButtonsCheckoutPage
            label="Back to Cart"
            variant="outlined"
            size="large"
            onClick={handelBackToCart}
          />
        </Stack>
      </Grid>
    </ContainerInfo>
  );
}
export default ProductOrderInfo;
