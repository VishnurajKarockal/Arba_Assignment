import { Box, Image, List, ListItem, Badge } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false); // State to track click
  const [cartCount, setCartCount] = useState(0); // State to store cart count
  const avatar = localStorage.getItem('avatar');
  const navigate = useNavigate();

  // Fetch cart count from backend API
  const fetchAllUserCartItems = async() => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`https://arba-assignment.onrender.com/cart`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if(res.data.products){
            setCartCount(res.data.products.length);
          }
    } catch (error) {
        console.log(error)
    }
}

const handleLogout = async() => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('https://arba-assignment.onrender.com/users/logout',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    if(res.data.msg){
      alert(res.data.msg);
      localStorage.setItem('isLoggedIn',"");
      window.location.reload()
    }
  } catch (error) {
    console.log(error.message)
  }
}

useEffect(() => {
    fetchAllUserCartItems()
}, [])

  return (
    <Box position="relative" display={"flex"} justifyContent={'space-between'}>
      <Button style={{backgroundColor:'#00aac3',padding:'10px',margin:'10px'}} onClick={() => navigate("/")}>Home</Button>
      <Box
        right="0"
        display="flex"
        flexDir={"row"}
        justifyContent={"end"}
      >
        
        <Box padding="10px">
          <FontAwesomeIcon icon={faCartShopping} style={{ color: '#00aac3', fontSize: '38px',position:'relative' }} onClick={() => navigate("/cart")} />
          {cartCount > 0 && <Badge colorScheme="red" borderRadius="full" position="relative" top="5%" right="4.2%">{cartCount}</Badge>}
        </Box>
        <Box 
          width="58px" 
          height="58px" 
          padding="10px" 
          onClick={() => setIsClicked(!isClicked)} // Toggle isClicked state on click
        >
          {avatar && <Image src={avatar} alt="User Avatar" borderRadius="50%" />}
        </Box>
        {isClicked && (
          <Box 
            position="absolute" 
            top="100%" 
            right="0" 
            transform="translateX(-20%)" 
            width="100px" 
            backgroundColor="gray.200" 
            zIndex="1" 
            borderRadius="5px"
            boxShadow="md"
            textAlign="center" 
          >
            <List style={{ padding: 0 }} marginTop={"10px"}>
              <ListItem><Link to="/store">My Store</Link></ListItem>
              <ListItem><Link to="/userprofile">Profile</Link></ListItem>
              <ListItem><button onClick={() =>handleLogout()}>Logout</button></ListItem>
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
