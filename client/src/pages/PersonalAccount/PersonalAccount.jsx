import { React } from 'react';
import { Container, Box } from '@mui/material';
import BrowsingHistory from '../../components/Smart/BrowsingHistory/BrowsingHistory';
import Profile from '../../components/Smart/Profile/Profile';

export default function PersonalAccount() {
  return (
    <Container maxWidth="lg" sx={{ margin: 'auto' }}>
      <Box>
        <Profile />
      </Box>
      <Box>
        <BrowsingHistory />
      </Box>
    </Container>
  );
}
