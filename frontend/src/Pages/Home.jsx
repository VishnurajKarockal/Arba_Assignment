
import { Box } from '@chakra-ui/react';
import CarouselComp from '../Components/CarouselComp';
import TermsAndConditions from '../Components/TermsAndConditions';
import Product from './Product';
import Login from './Login';

const Home = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <Box>
      {/* <img src='..Pages\src\frontend\backend\uploads\1712821699257-brooke-lark-jUPOXXRNdcA-unsplash.jpg'/> */}
      
      
      {isLoggedIn? <Box><CarouselComp /> <TermsAndConditions /> <Product /></Box> : <Login />}
    </Box>
  );
}

export default Home;
