import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const TermsAndConditions = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('acceptedTerms');
    const lastCloseTime = localStorage.getItem('lastCloseTime');
    console.log("Last Close Time:", lastCloseTime);
    if (!hasAccepted || (lastCloseTime && Date.now() - parseInt(lastCloseTime) > 30000)) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem('lastCloseTime', Date.now().toString());

    // Set a timer to refresh after 30 seconds
    setTimeout(() => {
      window.location.reload();
    }, 30000);
  };

  const handleAccept = () => {
    localStorage.setItem('acceptedTerms', true);
    setShowModal(false);
  };

  console.log("Show Modal:", showModal);
  return (
    <Modal isOpen={showModal} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalBody>
            <p>This is the terms and conditions text...</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={handleAccept}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default TermsAndConditions