import React from 'react';
import { Box, Image, Text, Heading } from '@chakra-ui/react';
import { Button } from 'react-bootstrap';
import axios from 'axios';


const SingleProductCard = (ele) => {
  const token = localStorage.getItem('token');
  const handleAddToCart = async(id) => {
    
    try {
      const res = await axios.post(`http://localhost:8080/cart/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if(res.data.msg){
        alert(res.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }
    const { title, description, price, image } = ele ;
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" position={"relative"} height={"auto"}>
      <Image src={image} alt={title} height={"60%"} width={"100%"}/>
      <Box p="6">
        <Box backgroundColor={"white"} width={"80%"}  d="flex" position={"absolute"} top={"200px"} alignItems="baseline" padding={"15px"} margin={"15px"} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}>
          <Heading as="h3" size="md" mb="2" mr="2">{title}</Heading>
          <Text mt="2" fontSize="sm" color="gray.600" lineHeight="tall">{description}</Text>
          <Text style={{color:"#00aac3"}} fontSize="sm" color="gray.500">RS: {price}</Text>
          <Button  style={{width:"90%",marginLeft:"5%",backgroundColor:"#00aac3"}} onClick={() => handleAddToCart(ele._id)}>Add To Cart</Button>
        </Box>
        
      </Box>
    </Box>
  );
}

export default SingleProductCard;
