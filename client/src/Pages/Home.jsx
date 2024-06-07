import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import MasterLayout from "../Layouts/MasterLayout";
import {
  FaHistory,
  FaPlay,
  FaQuestion,
  FaShareAlt,
  FaTrophy,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import Loading from "../Components/Loading";
import { useAuth } from "../Context/AuthContext";

export const Home = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isPageLoading, , disabledLoading] = useToggle(true);
  const { handleSignOut, isLoading } = useAuth();

  const signOut = async () => {
    try {
      const response = await handleSignOut();

      if (!response.success) {
        return toast({
          title: response.message,
          status: "error",
          isClosable: true,
        });
      }

      navigate("/signin");
    } catch (error) {
      toast({
        title: error?.message || "An error occurred",
        status: "error",
        isClosable: true,
      });
    }
  };

  setTimeout(() => {
    disabledLoading();
  }, 1000);

  useEffect(() => {
    document.title = "Home";
  }, []);

  return isPageLoading ? (
    <Loading />
  ) : (
    <MasterLayout
      wrapperStyle={{
        backgroundImage: "url('/assets/main_page_background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <Box>
        <Flex>
          <IconButton
            as={Link}
            to="/authors"
            isRound
            colorScheme="orange"
            aria-label="Authors"
            icon={<FaUsers size="25px" color="white" />}
            size="lg"
          />
          <Spacer />
          <IconButton
            as={Link}
            to="/about-the-game"
            isRound
            colorScheme="orange"
            aria-label="FAQs"
            icon={<FaQuestion size="25px" color="white" />}
            size="lg"
          />
        </Flex>
        <Flex marginTop="10px">
          <Spacer />
          <IconButton
            isRound
            colorScheme="orange"
            aria-label="Authors"
            icon={<FaShareAlt size="25px" color="white" />}
            size="lg"
          />
        </Flex>
      </Box>

      <Box
        marginTop="20px"
        display="flex"
        gap="5px"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="80%">
        <Image
          src="../assets/logo.png"
          alt="logo"
          boxSize="150px"
          h="110px"
          objectFit="cover"
        />
        <Image
          src="../assets/game_title.png"
          alt="game title"
          boxSize="200px"
          h="30px"
          objectFit="cover"
        />
        <Button
          as={Link}
          to="/play"
          colorScheme="orange"
          size="md"
          width="60%"
          leftIcon={<FaPlay />}>
          Play
        </Button>
        <Button
          colorScheme="orange"
          size="md"
          width="60%"
          leftIcon={<FaTrophy />}>
          Competitions
        </Button>
        <Button
          as={Link}
          to="/profile"
          colorScheme="orange"
          size="md"
          width="60%"
          leftIcon={<FaUser />}>
          Profile
        </Button>
        <Button
          colorScheme="orange"
          size="md"
          width="60%"
          leftIcon={<FaHistory />}>
          History
        </Button>
        <Button
          isLoading={isLoading}
          colorScheme="orange"
          size="md"
          width="60%"
          leftIcon={<TbLogout size="20px" />}
          onClick={signOut}>
          Logout
        </Button>
      </Box>
    </MasterLayout>
  );
};
