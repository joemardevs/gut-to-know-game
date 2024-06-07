import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import MasterLayout from "../Layouts/MasterLayout";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";

const Profile = () => {
  const { user } = useAuth();

  return (
    <MasterLayout
      containerStyle={{
        backgroundImage: "url('/assets/levels_bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
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

        <Text color="black" fontWeight="black" fontSize="1.3em">
          Profile Information
        </Text>
        <Text color="black" fontSize="1em" opacity="0.5">
          Name
        </Text>
        <Text color="black" fontSize="1em" fontWeight="bold">
          {user?.name}
        </Text>
        <Text color="black" fontSize="1em" opacity="0.5">
          Email
        </Text>
        <Text color="black" fontSize="1em" fontWeight="bold">
          {user?.email}
        </Text>
        <Text color="black" fontSize="1em" opacity="0.5">
          Username
        </Text>
        <Text color="black" fontSize="1em" fontWeight="bold">
          {user?.username}
        </Text>
      </Box>
    </MasterLayout>
  );
};

export default Profile;
