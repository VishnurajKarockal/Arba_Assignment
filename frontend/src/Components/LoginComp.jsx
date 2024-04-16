import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const LoginComp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://arba-assignment.onrender.com/users/login', {
        userName,
        password,
      });
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('userId',response.data.user._id);
      localStorage.setItem('avatar',response.data.user.avatar);
      console.log(localStorage.getItem('userId')); // Handle successful login response
      localStorage.setItem('isLoggedIn',"yes");
      
      alert(response.data.msg)
      setUserName('');
      setPassword('');
      window.location.reload(); 
      
    } catch (error) {
      alert(error.response.data.msg);
      console.error(error.response); // Handle login error
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              border={"none"}
              borderBottom={"solid"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              border={"none"}
              borderBottom={"solid"}
            />
          </FormControl>
          <Button type="submit" backgroundColor={'#008083'} mt="4" width={"100%"}>
            Login
          </Button>

        </form>
        <Text>Don't have an account <Link to={"/signup"} style={{color:"blue"}}>signup</Link></Text>
      </div>
    </div>
  );
};

export default LoginComp;
