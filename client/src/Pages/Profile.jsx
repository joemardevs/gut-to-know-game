import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import MasterLayout from "../Layouts/MasterLayout";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Img,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      if (!user?.token) return;
      const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
        headers: {
          "Content-Type": "application/json",
          x_auth_token: user?.token,
        },
      });
      const data = await response.json();

      if (!data?.success) {
        throw data;
      }
      // Fetch user profile

      setProfile(data.user);
    } catch (error) {
      console.log("Error fetching user profile: ", error.message);
    }
  };

  const updateAvatar = async avatar => {
    try {
      if (!user?.token) return;
      const response = await fetch(`${BACKEND_URL}/api/auth/update-avatar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          x_auth_token: user?.token,
        },
        body: JSON.stringify({ avatar }),
      });
      const data = await response.json();

      if (!data?.success) {
        throw data;
      }

      await fetchProfile();

      toast({
        title: "Avatar Updated",
        description: "Your avatar has been updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log("Error updating avatar: ", error.message);

      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <MasterLayout
      wrapperStyle={{
        backgroundImage: "url('/assets/levels_bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "20px",
      }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        h={{
          base: "100%",
          md: "80%",
        }}>
        <IconButton
          as={Link}
          to="/"
          isRound
          colorScheme="orange"
          aria-label="Authors"
          icon={<IoIosArrowBack size="2rem" color="white" />}
          size="lg"
          position="absolute"
          left=".1rem"
          top="0"
        />

        <Img
          onClick={onOpen}
          src={`/assets/avatar/${profile?.avatar}.png`}
          alt="Profile"
          w="100px"
          h="100px"
          borderRadius="full"
          boxShadow="2xl"
          cursor="pointer"
        />

        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
          <ModalOverlay />
          <ModalContent px="1rem">
            <ModalHeader>
              <Text color="black" fontSize="1em" textAlign="center">
                Choose Avatar
              </Text>
            </ModalHeader>
            <ModalBody>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <Img
                    key={index}
                    src={`/assets/avatar/${index + 1}.png`}
                    alt="Profile"
                    w="100px"
                    cursor="pointer"
                    onClick={() => {
                      updateAvatar(index + 1);
                      onClose();
                    }}
                  />
                ))}
              </Box>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button colorScheme="orange" onClick={onClose} w="100%">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Text color="black" fontWeight="black" fontSize="1.3em">
          Profile Information
        </Text>
        <Text color="black" fontSize="1em" opacity="0.5">
          Name
        </Text>
        <Text color="black" fontSize="1em" fontWeight="bold">
          {profile?.name}
        </Text>
        <Text color="black" fontSize="1em" opacity="0.5">
          Email
        </Text>
        <Text color="black" fontSize="1em" fontWeight="bold">
          {profile?.email}
        </Text>
        <Text color="black" fontSize="1em" opacity="0.5">
          Username
        </Text>
        <Text color="black" fontSize="1em" fontWeight="bold">
          {profile?.username}
        </Text>
      </Box>
    </MasterLayout>
  );
};

export default Profile;
