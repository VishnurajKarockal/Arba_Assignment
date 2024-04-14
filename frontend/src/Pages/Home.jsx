
import { Box } from '@chakra-ui/react';
import CarouselComp from '../Components/CarouselComp';
import TermsAndConditions from '../Components/TermsAndConditions';
import Product from './Product';

const Home = () => {
  

  return (
    <Box>
      {/* <img src='..Pages\src\frontend\backend\uploads\1712821699257-brooke-lark-jUPOXXRNdcA-unsplash.jpg'/> */}
      <CarouselComp />
      <TermsAndConditions />
      <Product />
    </Box>
  );
}

export default Home;
