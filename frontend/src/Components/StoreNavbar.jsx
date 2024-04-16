// StoreNavbar.jsx
import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const StoreNavbar = () => {
  const [selected, setSelected] = useState("cat");

  return (
    <Box margin={"30px auto"}>
      <Box margin={"auto"} width={"80%"} height={"25px"} backgroundColor={"grey"} display={"flex"} justifyContent={"center"}>
        <Box onClick={() => setSelected("cat")} width={"50%"} textAlign={"center"} backgroundColor={selected === "cat" ? "#00aac3" : "grey"} > 
          <Link to={"./"}>Categories</Link>
        </Box>
        <Box onClick={() => setSelected("products")} width={"50%"} textAlign={"center"} backgroundColor={selected === "products" ? "#00aac3" : "grey"} > 
          <Link to={"./prod"}>Products</Link>
        </Box>
      </Box>
      <Box display={"flex"} margin={"auto"} width={"80%"} marginTop={"20px"}>
        <Button backgroundColor={'#3d85c6'} marginRight={"10px"}>Refresh</Button>
        <Button backgroundColor={'#3d85c6'} marginRight={"10px"}>Filter</Button>
        <Button backgroundColor={'#3d85c6'} marginRight={"10px"}>Add</Button>
      </Box>
    </Box>
  );
}

export default StoreNavbar;
