import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import AvatarUser from '../../UI/Avatar/AvatapUser';
import { isAuthenticated } from '../../../helpers/authentication/authentication';
import { customerState } from '../../../redux/slices/customer';

export default function ProfileAvatar({ handleClick }) {
  const { customer } = useSelector(customerState);
  const [customerData, setCustomerData] = useState();

  useEffect(() => {
    if (customer) {
      setCustomerData(customer);
    }
  }, [customer]);

  return (
    <>
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        My Profile
      </Typography>
      <Box sx={{ margin: 'auto' }}>
        <AvatarUser
          isAuth={isAuthenticated()}
          isProfil
          nameAvatar={customerData && customerData.firstName}
          onClickLogOut={() => {
            return null;
          }}
        />
      </Box>
      <Box
        sx={{
          margin: 'auto',
          marginTop: '0px',
        }}
      >
        <Typography fontSize="18px" sx={{ marginBottom: '10px' }}>
          {customerData && customerData.login}
        </Typography>
      </Box>
      <Box
        sx={{
          margin: 'auto',
          marginBottom: '0px',
          textAlign: 'center',
        }}
      >
        <ButtonDark label="Log Out" onClick={handleClick} />
      </Box>
    </>
  );
}

ProfileAvatar.defaultProps = {
  handleClick: null,
};

ProfileAvatar.propTypes = {
  handleClick: PropTypes.func,
};
