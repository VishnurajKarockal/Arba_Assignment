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

const SignUpComp = () => {
  const token = localStorage.getItem('token');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null); // State to store selected avatar file

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('userName', userName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', avatar); // Append avatar file to FormData
      
      const res = await axios.post('http://localhost:8080/users/register', formData, {
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      });
  
      console.log("res"); // Check the response object in the console
  
      // Show alert with response message
      alert(res.data.msg);
      setFullName('');
      setUserName('');
      setEmail('');
      setPassword('');
      setAvatar(null);
    } catch (error) {
      // if (error.response && error.response.status === 400) {
      //   // If status is 400, show the custom error message from the backend
      //   alert(error.response.data);
      // } else {
      //   // For other errors, log the error to console
      //   console.log(error);
      // }
      console.log(error.message)
      
    }
  };
  

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              border={"none"}
              borderBottom={"solid"}
            />
          </FormControl>
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
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
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
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              border={"none"}
              borderBottom={"solid"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Avatar</FormLabel>
            <Input
              type="file" // Set input type as file
              onChange={(e) => setAvatar(e.target.files[0])} // Set selected file to state
              border={"none"}
              borderBottom={"solid"}
            />
          </FormControl>
          <Button type="submit" backgroundColor={'#008083'} mt="4" width={"100%"}>
            Register
          </Button>
        </form>
        <Text>Already have an account <Link top={"/login"} color={"blue"}>login</Link></Text>
      </div>
    </div>
  );
};

export default SignUpComp;
