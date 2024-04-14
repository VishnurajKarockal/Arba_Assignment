import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@chakra-ui/react';
import SingleCartCard from '../Components/SingleCartCard';

const Cart = () => {
    const [userCart,setUserCart] = useState([]);
    const fetchAllUserCartItems = async() => {
        const token = localStorage.getItem('token')
        try {
            const res = await axios.get(`http://localhost:8080/cart`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              if(res.data.products){
                setUserCart(res.data.products);
              }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAllUserCartItems()
    }, [])
    console.log("aaaaaaaaaaaaaaaaaaa",userCart)
  return (
    <Box padding={"50px"}>
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }}
      gap={6}
      justifyContent="center"
    >
      {userCart.map((ele,i) => (
            
            <SingleCartCard key={i} {...ele} />
        ))}
        
    </Grid>
        
  </Box>
  )
}

export default Cart