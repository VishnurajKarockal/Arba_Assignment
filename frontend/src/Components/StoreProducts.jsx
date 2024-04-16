import { Box, Grid, Link } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StoreProducts = () => {
  const token = localStorage.getItem('token');
  const [cats,setCats] = useState([]);
  const handleFetchCats = async() => {
    try {
      const res = await axios.get(`https://arba-assignment.onrender.com/products`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      
      if(res.data.products){
        setCats(res.data.products);
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    handleFetchCats()
  }, [])
  
  return (
    <Box >
      <Grid textAlign={"start"} margin={"auto"} width={"80%"} templateColumns={'repeat(4, 1fr)'}backgroundColor={'#3d85c6'}>
        <Box border={"1px solid"} padding={"10px 20px"} >Image</Box>
        <Box border={"1px solid"} padding={"10px 20px"} >Name</Box>
        <Box border={"1px solid"} padding={"10px 20px"} >Price</Box>
        <Box border={"1px solid"} padding={"10px 20px"} >Action</Box>
      </Grid>
      <Box>
        {cats.map((ele,i) => (
          <Grid key={i} margin={"auto"} textAlign={"start"} width={"80%"} templateColumns={'repeat(4, 1fr)'} >
            <Box border={"1px solid"} padding={"10px 20px"} >{ele.title}/image.jpg</Box>
            <Box border={"1px solid"} padding={"10px 20px"} >{ele.title}</Box>
            <Box border={"1px solid"} padding={"10px 20px"} >{ele.price}</Box>
            <Box border={"1px solid"} padding={"10px 20px"} ><Link>Edit</Link> | <Link>Delete</Link></Box>
          </Grid>
        ))}
      </Box>
    </Box>
  )
}

export default StoreProducts