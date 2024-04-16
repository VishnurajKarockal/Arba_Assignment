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
            <p>By accessing or using our services, you agree to comply with these terms and conditions. You acknowledge that any violation may result in termination of your access to the services. The content provided on our platform is for informational purposes only and should not be considered professional advice. We reserve the right to modify or terminate the services at any time without prior notice. You agree not to engage in any illegal or unauthorized activities while using our services. We are not liable for any damages or losses resulting from your use of the services. Your continued use constitutes acceptance of these terms.</p>
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