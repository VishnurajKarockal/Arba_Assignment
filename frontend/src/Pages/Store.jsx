// Store.jsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import StoreNavbar from '../Components/StoreNavbar';
import StoreRoute from '../Routes/StoreRoute';

const Store = () => {
  return (
    <Box margin={"30px auto"}>
      <StoreNavbar />
      <StoreRoute />
    </Box>
  );
}

export default Store;
