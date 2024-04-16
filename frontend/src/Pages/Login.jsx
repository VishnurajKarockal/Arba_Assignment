import { Grid, Box, calc } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import LoginComp from '../Components/LoginComp';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding={"50px 150px"}
    >
      <Box
        width="100%"
        height={{ base: 'auto', md: '100%' }}
        display={{ base: 'none', md: 'block' }}
      >
        <Image
          src='https://img.freepik.com/fotos-premium/padrao-verde-e-branco-com-fundo-de-design-vertical-de-bordas-curvas_7954-28888.jpg?w=360'
          objectFit="cover"
          width="90%"
          height='calc(90vh - 90px)'
        />
      </Box>
      <Box
        padding={"100px 30px"}
        width="90%"
        height="90%"
      >
        <Box margin={"auto"} width={{base:"60px",md:"80px"}} height={{base:"60px",md:"80px"}} borderRadius={"50%"} backgroundColor={'#008083'}></Box>
        {isLoggedIn?<Navigate to={"/"}/> : <LoginComp />}
      </Box>
    </Grid>
  );
};

export default Login;
