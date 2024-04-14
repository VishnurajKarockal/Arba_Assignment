import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';

const LoginComp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        userName,
        password,
      });
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('userId',response.data.user._id);
      localStorage.setItem('avatar',response.data.user.avatar);
      console.log(localStorage.getItem('userId')); // Handle successful login response
      alert(response.data.msg)
      setUserName('');
      setPassword('');
    } catch (error) {
      console.error(error); // Handle login error
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
        <Text>Don't have an account <Link top={"/signup"} color={"blue"}>signup</Link></Text>
      </div>
    </div>
  );
};

export default LoginComp;
