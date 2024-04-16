import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import StoreRoute from '../Routes/StoreRoute'
import { Link } from 'react-router-dom';

const Store = () => {
    const [selected, setSelected] = useState("cat");

    return (
        <Box margin={"30px auto"}>
            <Box margin={"auto"} width={"80%"} height={"25px"} backgroundColor={"grey"} display={"flex"} justifyContent={"center"}>
                <Box onClick={() => setSelected("cat")} width={"50%"} textAlign={"center"} backgroundColor={selected === "cat" ? "#00aac3" : "grey"} > <Link to={"/"}>Categories</Link></Box>
                <Box onClick={() => setSelected("products")} width={"50%"} textAlign={"center"} backgroundColor={selected === "products" ? "#00aac3" : "grey"} > <Link to={"/prod"}>Products</Link></Box>
            </Box>
            <StoreRoute />
        </Box>
    )
}

export default Store;
