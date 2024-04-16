import { Box, Grid, Link } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StoreCategories = () => {
  const token = localStorage.getItem('token');
  const [cats,setCats] = useState([]);
  const handleFetchCats = async() => {
    try {
      const res = await axios.get(`http://localhost:8080/categories`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(res.data.categories){
        setCats(res.data.categories);
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
      <Grid margin={"auto"} textAlign={"center"} width={"80%"} templateColumns={'repeat(4, 1fr)'}backgroundColor={'#3d85c6'}>
        <Box border={"1px solid"} padding={"10px 20px"} >Image</Box>
        <Box border={"1px solid"} padding={"10px 20px"} >Name</Box>
        <Box border={"1px solid"} padding={"10px 20px"} >Slug</Box>
        <Box border={"1px solid"} padding={"10px 20px"} >Action</Box>
      </Grid>
      <Box>
        {cats.map((ele,i) => (
          <Grid key={i} margin={"auto"} textAlign={"center"} width={"80%"} templateColumns={'repeat(4, 1fr)'} >
            <Box border={"1px solid"} padding={"10px 20px"} >{ele.image}</Box>
            <Box border={"1px solid"} padding={"10px 20px"} >{ele.name}</Box>
            <Box border={"1px solid"} padding={"10px 20px"} >{ele.slug}</Box>
            <Box border={"1px solid"} padding={"10px 20px"} ><Link>Edit</Link>|<Link>Delete</Link></Box>
          </Grid>
        ))}
      </Box>
    </Box>
  )
}

export default StoreCategories