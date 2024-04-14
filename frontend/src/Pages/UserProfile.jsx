import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box, Image } from '@chakra-ui/react';
import axios from 'axios';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    image: localStorage.getItem('avatar') || '',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      for (const key in userDetails) {
        if (userDetails.hasOwnProperty(key)) {
          formData.append(key, userDetails[key]);
        }
      }

      await axios.patch('http://localhost:8080/users/update', formData);

      for (const key in userDetails) {
        if (userDetails.hasOwnProperty(key)) {
          localStorage.setItem(key, userDetails[key]);
        }
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  return (
    <Box maxW="400px" mx="auto" mt="50px" p="20px" borderWidth="1px" borderRadius="lg">
      {isEditing ? (
        <form>
          <FormControl isRequired mb="4">
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              value={userDetails.username}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Avatar</FormLabel>
            <Input
              name="image"
              type="file"
              onChange={(e) =>
                setUserDetails({ ...userDetails, image: e.target.files[0] })
              }
            />
          </FormControl>
          <Button colorScheme="teal" mr="4" onClick={handleSaveClick}>
            Update Profile
          </Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </form>
      ) : (
        <div>
          <Image src={userDetails.image} alt="User Avatar" mb="4" />
          <p>
            <strong>Username:</strong> {userDetails.username}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <Button mt="4" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      )}
    </Box>
  );
};

export default UserProfile;
