import React, { useEffect, useState } from 'react';
import axios from "axios";
import SingleProductCard from '../Components/SingleProductCard';
import { Box, Grid, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const defaultProductCount = 8; // Change this value to adjust the default number of products shown
  const [visibleProducts, setVisibleProducts] = useState([]);
  const navigate = useNavigate();

  const fetchUserProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.products) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);

  useEffect(() => {
    if (!showAll) {
      setVisibleProducts(products.slice(0, defaultProductCount));
    } else {
      setVisibleProducts(products);
    }
  }, [showAll, products]);

  const handleShowAll = () => {
    setShowAll(true);
    navigate("/products")
  };

  return (
    <Box padding={"50px"}>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }}
        gap={6}
        justifyContent="center"
      >
        {visibleProducts.map((ele, i) => {
          
            return <SingleProductCard key={i} {...ele} />;
          
          // Add this line if you want to explicitly return null for other cases
        })}
      </Grid>
      {!showAll && (
        <Box mt={4} textAlign="center">
          <Button onClick={handleShowAll}>Show All Products</Button>
        </Box>
      )}
    </Box>
  );
};

export default Product;
